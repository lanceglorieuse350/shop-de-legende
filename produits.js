(function () {
  const SUPABASE_URL = "https://wrhokeajjmupnxpfurcc.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_0mmEGRZ_GKmgKSMKE83S8A_huJaAdL9";
  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  async function fetchAndRenderProducts() {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    // On récupère les produits depuis Supabase
    const { data: produits, error } = await supabaseClient
      .from('produits')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error("Erreur de chargement des produits:", error);
      return;
    }

    grid.innerHTML = ""; // On vide le conteneur

    produits.forEach(prod => {
      const isOutOfStock = prod.stock <= 0;
      
      // On génère le bouton (grisé si rupture de stock)
      const btnHtml = isOutOfStock 
        ? `<button type="button" class="payment-btn" disabled style="background:#555; cursor:not-allowed;">❌ Rupture de stock</button>`
        : `<button type="button" class="payment-btn" data-lecart-add data-stripe-price-id="${prod.stripe_price_id}" data-product-name="${prod.nom}" data-product-price="${prod.prix}" data-product-image="${prod.image_url}">💳 Ajouter au panier — ${prod.prix} €</button>`;

      // On crée la carte du produit
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-images">
          <img src="${prod.image_url}" class="product-image" alt="${prod.nom}" loading="lazy" data-zoom>
        </div>
        <div class="product-info">
          <h3 class="product-title">${prod.nom}</h3>
          <div class="price">${prod.prix} €</div>
          <p class="desc">${prod.description || "Description à venir..."}</p>
          <p style="font-size:0.8rem; color:#888;">Stock disponible : ${prod.stock}</p>
          ${btnHtml}
        </div>
      `;
      grid.appendChild(card);
    });

    // On dit à LeCart de scanner les nouveaux boutons
    if (window.LeCart && typeof window.LeCart.init === 'function') {
      window.LeCart.init();
    }
  }

  // On lance le chargement dès que la page est prête
  document.addEventListener("DOMContentLoaded", fetchAndRenderProducts);
})();