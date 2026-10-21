function changerMusique(fichier){
    const player = document.getElementById("player");
    if (!player) return; // Sécurité si le lecteur n'est pas sur la page
    const etaitEnLecture = !player.paused && !player.ended;

    player.src = "Musique/" + encodeURIComponent(fichier);
    player.load();

    if(etaitEnLecture){
        player.play().catch(() => {});
    }
}

function toggleDetails(bouton){
    const details = bouton.nextElementSibling;
    const ouvrir = bouton.getAttribute("aria-expanded") !== "true";

    details.style.display = ouvrir ? "block" : "none";
    bouton.setAttribute("aria-expanded", String(ouvrir));
    bouton.textContent = ouvrir ? "➖ Voir moins" : "➕ Voir plus";
}

function lirePanier(){
    try{
        const panier = JSON.parse(localStorage.getItem("panier"));
        return Array.isArray(panier) ? panier : [];
    }catch(erreur){
        return [];
    }
}

function actualiserCompteur(){
    const compteur = document.getElementById("cart-count");
    if (compteur) {
        compteur.textContent = lirePanier().length;
    }
}

function ajouterPanier(nom, prix){
    const panier = lirePanier();
    panier.push({nom:nom, prix:prix});

    try{
        localStorage.setItem("panier", JSON.stringify(panier));
    }catch(erreur){
        alert(
            "Impossible d'enregistrer le panier. Vérifie que le stockage " +
            "du navigateur est autorisé."
        );
        return;
    }

    actualiserCompteur();

    const element = document.querySelector(".cart-container");
    if(element) {
        element.classList.remove("bump");
        void element.offsetWidth;
        element.classList.add("bump");
        setTimeout(() => element.classList.remove("bump"), 300);
    }
}

function ouvrirPanierClavier(evenement){
    if(evenement.key === "Enter" || evenement.key === " "){
        evenement.preventDefault();
        window.location.href = "panier.html";
    }
}

// Initialisation du compteur
actualiserCompteur();

window.addEventListener("storage", (evenement) => {
    if(evenement.key === "panier" || evenement.key === null){
        actualiserCompteur();
    }
});

let ancienFocus = null;

function ouvrirZoom(source, evenement){
    if(evenement){
        evenement.stopPropagation();
    }

    const modal = document.getElementById("zoomModal");
    const zoomImg = document.getElementById("zoomImg");
    
    if (modal && zoomImg) {
        ancienFocus = document.activeElement;
        zoomImg.src = source;
        modal.style.display = "flex";
        const closeBtn = document.querySelector(".zoom-close");
        if(closeBtn) closeBtn.focus();
    }
}

function fermerZoom(){
    const modal = document.getElementById("zoomModal");
    if(modal) {
        modal.style.display = "none";
    }

    if(ancienFocus){
        ancienFocus.focus();
        ancienFocus = null;
    }
}

document.addEventListener("keydown", (evenement) => {
    const modal = document.getElementById("zoomModal");
    if(!modal) return;

    if(modal.style.display !== "flex"){
        return;
    }

    if(evenement.key === "Escape"){
        fermerZoom();
    }

    if(evenement.key === "Tab"){
        evenement.preventDefault();
        const closeBtn = document.querySelector(".zoom-close");
        if(closeBtn) closeBtn.focus();
    }
});

let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");

function showSlide(index){
    slides.forEach((slide, position) => {
        slide.classList.toggle("active", position === index);
    });
}

if(
    slides.length > 1 &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
){
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

function toggleMode(){
    document.body.classList.toggle("light-mode");
}

// --- RECHERCHE (Uniquement actif si on est sur la page avec la barre de recherche) ---
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

if (searchForm && searchInput) {
    const clearSearch = document.getElementById("clearSearch");
    const suggestions = document.getElementById("searchSuggestions");
    const searchResults = document.getElementById("searchResults");
    const searchStatus = document.getElementById("searchStatus");
    const noProducts = document.getElementById("noProducts");

    const prixFrancais = new Intl.NumberFormat("fr-FR", {
        style:"currency",
        currency:"EUR"
    });

    function normaliser(texte){
        return String(texte)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase("fr")
            .replace(/[’']/g, " ")
            .replace(/[^\p{L}\p{N}]+/gu, " ")
            .trim();
    }

    const produits = Array.from(
        document.querySelectorAll(".product-card")
    ).map((carte) => {
        const nom = carte.dataset.name || "";
        const description = carte.querySelector(".desc")?.textContent || "";
        const details = carte.querySelector(".details")?.textContent || "";

        return {
            carte:carte,
            nom:nom,
            prix:Number(carte.dataset.price),
            texte:normaliser(nom + " " + description + " " + details)
        };
    });

    let correspondances = [];
    let highlightTimer;

    function fermerSuggestions(){
        suggestions.hidden = true;
        searchInput.setAttribute("aria-expanded", "false");
    }

    function afficherSuggestions(){
        if(!searchInput.value.trim()){
            fermerSuggestions();
            return;
        }

        suggestions.hidden = false;
        searchInput.setAttribute("aria-expanded", "true");
    }

    function filtrerProduits(ouvrirSuggestions = true){
        const recherche = normaliser(searchInput.value);
        const mots = recherche.split(/\s+/).filter(Boolean);

        correspondances = produits.filter((produit) => {
            return mots.every((mot) => produit.texte.includes(mot));
        });

        produits.forEach((produit) => {
            produit.carte.hidden = !correspondances.includes(produit);
        });

        clearSearch.hidden = searchInput.value.length === 0;
        noProducts.hidden = mots.length === 0 || correspondances.length > 0;

        searchResults.replaceChildren();

        if(!mots.length){
            searchStatus.textContent = "";
            fermerSuggestions();
            return;
        }

        searchStatus.textContent =
            correspondances.length === 0
                ? "Aucun produit trouvé."
                : correspondances.length + " produit(s) trouvé(s).";

        if(correspondances.length === 0){
            const message = document.createElement("li");
            message.className = "search-empty";
            message.textContent = "Aucun produit trouvé. Essaie un autre mot.";
            searchResults.appendChild(message);
        }else{
            correspondances.forEach((produit) => {
                const ligne = document.createElement("li");
                const lien = document.createElement("a");
                const nom = document.createElement("span");
                const prix = document.createElement("span");

                lien.className = "search-result";
                lien.href = "#" + produit.carte.id;

                nom.className = "search-result-name";
                nom.textContent = produit.nom;

                prix.className = "search-result-price";
                prix.textContent = prixFrancais.format(produit.prix);

                lien.append(nom, prix);
                ligne.appendChild(lien);
                searchResults.appendChild(ligne);

                lien.addEventListener("click", (evenement) => {
                    evenement.preventDefault();
                    selectionnerProduit(produit);
                });
            });
        }

        if(ouvrirSuggestions){
            afficherSuggestions();
        }
    }

    function selectionnerProduit(produit){
        searchInput.value = produit.nom;
        filtrerProduits(false);
        fermerSuggestions();

        produits.forEach((element) => {
            element.carte.classList.remove("search-highlight");
        });

        clearTimeout(highlightTimer);
        produit.carte.classList.add("search-highlight");

        produit.carte.focus({preventScroll:true});
        produit.carte.scrollIntoView({
            behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth",
            block:"start"
        });

        highlightTimer = setTimeout(() => {
            produit.carte.classList.remove("search-highlight");
        }, 2500);
    }

    searchInput.addEventListener("input", () => {
        filtrerProduits();
    });

    searchInput.addEventListener("focus", () => {
        if(searchInput.value.trim()){
            filtrerProduits();
        }
    });

    searchInput.addEventListener("keydown", (evenement) => {
        if(evenement.key === "ArrowDown"){
            const premierResultat = searchResults.querySelector("a");

            if(premierResultat){
                evenement.preventDefault();
                afficherSuggestions();
                premierResultat.focus();
            }
        }

        if(evenement.key === "Escape"){
            fermerSuggestions();
        }
    });

    searchResults.addEventListener("keydown", (evenement) => {
        const liens = Array.from(searchResults.querySelectorAll("a"));
        const index = liens.indexOf(document.activeElement);

        if(evenement.key === "ArrowDown"){
            evenement.preventDefault();
            liens[Math.min(index + 1, liens.length - 1)]?.focus();
        }

        if(evenement.key === "ArrowUp"){
            evenement.preventDefault();

            if(index <= 0){
                searchInput.focus();
            }else{
                liens[index - 1].focus();
            }
        }

        if(evenement.key === "Escape"){
            searchInput.focus();
            fermerSuggestions();
        }
    });

    searchForm.addEventListener("submit", (evenement) => {
        evenement.preventDefault();
        filtrerProduits(false);
        fermerSuggestions();

        if(!searchInput.value.trim()){
            return;
        }

        if(correspondances.length === 1){
            selectionnerProduit(correspondances[0]);
        }else{
            document.getElementById("produits").scrollIntoView({
                behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "auto"
                    : "smooth",
                block:"start"
            });
        }
    });

    clearSearch.addEventListener("click", () => {
        searchInput.value = "";
        filtrerProduits(false);
        searchInput.focus();
    });
    
    document.addEventListener("click", (evenement) => {
        if(!searchForm.contains(evenement.target)){
            fermerSuggestions();
        }
    });

    searchForm.addEventListener("focusout", () => {
        setTimeout(() => {
            if(!searchForm.contains(document.activeElement)){
                fermerSuggestions();
            }
        }, 0);
    });
}

// --- BOUTON RETOUR EN HAUT ---
function retourEnHaut(){
    window.scrollTo({
        top:0,
        behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth"
    });
}

function actualiserBoutonHaut(){
    const topBtn = document.getElementById("top");
    if (topBtn) {
        topBtn.style.display = window.scrollY > 400 ? "flex" : "none";
    }
}

window.addEventListener("scroll", actualiserBoutonHaut, {passive:true});
actualiserBoutonHaut();

// --- FORMULAIRE DE CONTACT (Page contact.html) ---
function envoyerMail(e){
    if(e) e.preventDefault();

    const nomEl = document.getElementById("nom");
    const emailEl = document.getElementById("email");
    const messageEl = document.getElementById("message");

    if (!nomEl || !emailEl || !messageEl) return;

    const nom = nomEl.value.trim();
    const email = emailEl.value.trim();
    const message = messageEl.value.trim();

    if(!nom || !email || !message){
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const mailto = `mailto:lanceglorieuse@gmail.com?subject=Message de ${nom}&body=Email : ${email}%0D%0A%0D%0A${message}`;

    const confirmation = document.getElementById("confirmation");
    if(confirmation) {
        confirmation.hidden = false;
        confirmation.style.display = "block"; 
    }

    window.location.href = mailto;
}

// ============================================
// GESTION DE LA PAGE PAIEMENT (paiement.html)
// ============================================
const liensStripe = {
    "drone": "https://buy.stripe.com/28E6oJaoqdRg6VT0M10ZW01",
    "projecteur": "https://buy.stripe.com/dRmfZj0NQ14u1Bz7ap0ZW02",
    "pack-hiver": "https://buy.stripe.com/XXXXXXXXXXXX", // À compléter avec ton lien Stripe
    "endoscope": "https://buy.stripe.com/7sYeVfcwy00q6VTdyN0ZW03"
};

// On vérifie qu'on est bien sur la page paiement avant d'exécuter le code
const zonePanierPaiement = document.getElementById("panier");
const totalPanierPaiement = document.getElementById("total");

if (zonePanierPaiement && totalPanierPaiement) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let total = 0;

    zonePanierPaiement.innerHTML = "";

    if(panier.length === 0){
        zonePanierPaiement.innerHTML = `
            <div class="item" style="background:#1c1c1c; padding:1.2rem; margin-bottom:1rem; border-left:5px solid var(--gold); border-radius:12px; font-size:1.25rem;">
                Votre panier est vide.
            </div>
        `;
    }

    panier.forEach(item => {
        zonePanierPaiement.innerHTML += `
            <div class="item" style="background:#1c1c1c; padding:1.2rem; margin-bottom:1rem; border-left:5px solid var(--gold); border-radius:12px; font-size:1.25rem;">
                ${item.nom} — <strong style="color:var(--gold);">${item.prix} €</strong>
            </div>
        `;
        total += item.prix;
    });

    if(panier.length > 0) {
        totalPanierPaiement.innerHTML = "Total : " + total.toFixed(2) + " €";
    }

    // Gestion du bouton Stripe
    const params = new URLSearchParams(window.location.search);
    const produit = params.get("produit");
    const boutonPayer = document.getElementById("btn-payer");

    if(boutonPayer) {
        if(produit && liensStripe[produit]){
            boutonPayer.href = liensStripe[produit];
        } else if (panier.length > 0) {
             boutonPayer.href = "https://buy.stripe.com/28E6oJaoqdRg6VT0M10ZW01"; 
        } else {
            boutonPayer.href = "#";
            boutonPayer.textContent = "Panier vide";
            boutonPayer.style.pointerEvents = "none";
            boutonPayer.style.opacity = "0.5";
        }
    }
}

// ============================================
// GESTION DE LA PAGE PANIER (panier.html)
// ============================================

// On vérifie qu'on est bien sur la page panier avant de lancer le script
const zonePanierHTML = document.getElementById("panier");
const totalPanierHTML = document.getElementById("total");
const btnPayer = document.getElementById("payer");

if (zonePanierHTML && totalPanierHTML && btnPayer) {
    
    let panier = JSON.parse(localStorage.getItem("panier")) || [];

    function afficherPanier() {
        const zone = document.getElementById("panier");
        const totalEl = document.getElementById("total");
        const countEl = document.getElementById("cart-count-display");

        if (!zone || !totalEl || !countEl) return;

        zone.innerHTML = "";
        let total = 0;

        panier.forEach((item, index) => {
            zone.innerHTML += `
                <div style="background: #1c1c1c; padding: 1rem; margin-bottom: 1rem; border-left: 4px solid var(--gold); border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <span>${item.nom} — <strong style="color: var(--gold);">${item.prix} €</strong></span>
                    <button onclick="supprimerArticle(${index})" style="background: var(--red); color: #fff; border: none; border-radius: 6px; padding: 0.5rem 1rem; cursor: pointer; font-weight: bold;">Supprimer</button>
                </div>
            `;
            total += item.prix;
        });

        totalEl.innerHTML = "Total : " + total.toFixed(2) + " €";
        countEl.innerText = "Articles dans le panier : " + panier.length;
    }

    function supprimerArticle(index) {
        panier.splice(index, 1);
        localStorage.setItem("panier", JSON.stringify(panier));
        afficherPanier();
        actualiserCompteur(); // Met à jour le petit badge du panier dans le menu
    }

    // Rendre la fonction accessible depuis le HTML
    window.supprimerArticle = supprimerArticle;

    afficherPanier();

    // ============================================
    // GESTION DU PAIEMENT STRIPE
    // ============================================
    // ⚠️ REMPLACE "pk_live_..." par ta vraie clé publique Stripe
    const stripe = Stripe("pk_live_51UNkYQ…u33UV008Oeu1wN7"); 

    btnPayer.addEventListener("click", async () => {
        if (panier.length === 0) {
            alert("Votre panier est vide.");
            return;
        }

        try {
            // Ici, tu dois remplacer par l'URL réelle de ton backend (Node.js par ex)
            const response = await fetch("https://TON-BACKEND.onrender.com/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: panier })
            });

            if (!response.ok) {
                throw new Error("Erreur de connexion au serveur de paiement.");
            }

            const session = await response.json();
            stripe.redirectToCheckout({ sessionId: session.id });
            
        } catch (error) {
            console.error("Erreur Stripe :", error);
            alert("Le paiement n'est pas disponible pour le moment. Veuillez réessayer plus tard.");
        }
    });
}