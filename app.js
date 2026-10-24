document.addEventListener("DOMContentLoaded", function() {
    // --- 0. GESTION DES ERREURS GLOBALE (Pour éviter que le site crashe) ---
    window.addEventListener('error', function(e) {
        console.warn("Erreur interceptée :", e.message);
    });

    // --- 1. NAVIGATION SPA (Single Page Application) ---
    const sections = document.querySelectorAll(".page-section");
    const navLinks = document.querySelectorAll(".nav-link");
    
    window.navigateTo = function(pageId, anchorId) {
        sections.forEach(sec => sec.classList.remove("active"));
        const target = document.getElementById("page-" + pageId);
        if (target) target.classList.add("active");
        
        navLinks.forEach(link => link.classList.remove("active-link"));
        const activeLink = document.getElementById("nav-" + pageId);
        if (activeLink) activeLink.classList.add("active-link");
        
        if (anchorId) {
            setTimeout(() => {
                const el = document.getElementById(anchorId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Écouteurs sur la navigation
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === "#" || href === "javascript:void(0)") return;
            e.preventDefault();
            const targetId = href.substring(1);
            
            // Gestion spéciale pour les ancres internes vs les pages
            const pageTarget = document.getElementById("page-" + targetId);
            if (pageTarget) {
                window.navigateTo(targetId);
            } else {
                const el = document.getElementById(targetId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Boutons retour à l'accueil
    document.querySelectorAll('.return-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.navigateTo('accueil');
        });
    });

    // Boutons du menu de prévention
    document.querySelectorAll('.prevention-nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const onclickAttr = link.getAttribute('onclick');
            if (onclickAttr) eval(onclickAttr);
        });
    });

    // --- 2. MENU MOBILE & BURGER (Si présent) ---
    const btnBrand = document.getElementById("btn-brand");
    if(btnBrand) btnBrand.addEventListener("click", () => window.navigateTo('accueil'));

    // --- 3. MODE CLAIR / SOMBRE ---
    const btnMode = document.getElementById("btn-mode");
    if (btnMode) {
        btnMode.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            const isLight = document.body.classList.contains("light-mode");
            try { localStorage.setItem("guillet_theme", isLight ? "light" : "dark"); } catch(e){}
        });
        try {
            if (localStorage.getItem("guillet_theme") === "light") {
                document.body.classList.add("light-mode");
            }
        } catch(e){}
    }

    // --- 4. RECHERCHE PRODUITS ---
    const searchInput = document.getElementById("searchInput");
    const searchForm = document.getElementById("searchForm");
    const searchResults = document.getElementById("searchResults");
    const searchSuggestions = document.getElementById("searchSuggestions");
    const clearSearch = document.getElementById("clearSearch");
    const noProducts = document.getElementById("noProducts");

    if (searchInput && searchForm) {
        const products = document.querySelectorAll(".product-card");
        
        searchInput.addEventListener("input", function() {
            const val = this.value.toLowerCase().trim();
            if (clearSearch) clearSearch.hidden = val === "";
            if (!val) {
                if(searchSuggestions) searchSuggestions.hidden = true;
                products.forEach(p => p.style.display = "flex");
                if(noProducts) noProducts.hidden = true;
                return;
            }
            
            let matches = 0;
            products.forEach(p => {
                const name = p.getAttribute("data-name") || "";
                if (name.toLowerCase().includes(val)) {
                    p.style.display = "flex";
                    matches++;
                } else {
                    p.style.display = "none";
                }
            });
            
            if(noProducts) noProducts.hidden = matches > 0;
            if(searchSuggestions) searchSuggestions.hidden = true;
        });
        
        searchForm.addEventListener("submit", function(e) {
            e.preventDefault();
            window.navigateTo('accueil', 'produits');
        });

        if (clearSearch) {
            clearSearch.addEventListener("click", function() {
                searchInput.value = "";
                searchInput.dispatchEvent(new Event('input'));
                searchInput.focus();
            });
        }
    }

    // --- 5. BOUTON "VOIR PLUS" (DETAILS) ---
    document.querySelectorAll("[data-toggle-details]").forEach(btn => {
        btn.addEventListener("click", function() {
            const targetId = this.getAttribute("aria-controls");
            const target = document.getElementById(targetId);
            if (!target) return;
            
            const isExpanded = this.getAttribute("aria-expanded") === "true";
            this.setAttribute("aria-expanded", !isExpanded);
            target.style.display = isExpanded ? "none" : "block";
            this.textContent = isExpanded ? "Voir plus" : "Voir moins";
        });
    });

    // --- 6. ZOOM IMAGES ---
    const zoomModal = document.getElementById("zoomModal");
    const zoomImg = document.getElementById("zoomImg");
    
    window.fermerZoom = function() {
        if (zoomModal) zoomModal.style.display = "none";
        document.body.classList.remove("modal-open");
    };

    document.querySelectorAll(".zoomable").forEach(img => {
        img.addEventListener("click", function() {
            if (zoomModal && zoomImg) {
                zoomImg.src = this.src;
                zoomModal.style.display = "flex";
                document.body.classList.add("modal-open");
            }
        });
    });

    // --- 7. FORMULAIRE DE CONTACT ---
    const contactForm = document.getElementById("contactForm");
    const confirmation = document.getElementById("confirmation");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const nom = document.getElementById("nom").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;
            
            const body = encodeURIComponent(`Nom: ${nom}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailto = `mailto:lanceglorieuse@gmail.com?subject=Contact%20GUILLET%20IV&body=${body}`;
            window.location.href = mailto;
            
            if(confirmation) {
                confirmation.hidden = false;
                setTimeout(() => { confirmation.hidden = true; }, 5000);
            }
            contactForm.reset();
        });
    }

    // --- 8. MODAL PREVENTION HARCELEMENT ---
    const preventionPage = document.getElementById("prevention-page");
    const navHarcelement = document.getElementById("nav-harcelement");
    const footerHarcelement = document.getElementById("footer-nav-harcelement");
    const btnClosePrevention = document.getElementById("btn-close-prevention");

    window.fermerPrevention = function() {
        if (preventionPage) preventionPage.classList.remove("open");
        document.body.classList.remove("modal-open");
    };

    if(navHarcelement) navHarcelement.addEventListener("click", () => { preventionPage.classList.add("open"); document.body.classList.add("modal-open"); });
    if(footerHarcelement) footerHarcelement.addEventListener("click", () => { preventionPage.classList.add("open"); document.body.classList.add("modal-open"); });
    if(btnClosePrevention) btnClosePrevention.addEventListener("click", window.fermerPrevention);

    // --- 9. BOUTON RETOUR EN HAUT ---
    const topBtn = document.getElementById("top");
    if (topBtn) {
        window.addEventListener("scroll", () => {
            topBtn.style.display = window.scrollY > 300 ? "flex" : "none";
        });
        topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // --- 10. SLIDER HERO ---
    var sl = document.querySelectorAll(".hero-slide"); var cs = 0;
    if (sl.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setInterval(function(){ cs = (cs + 1) % sl.length; sl.forEach(function(s, p){ s.classList.toggle("active", p === cs); }); }, 5000);
    }

    // --- 11. TRADUCTEUR MULTILINGUE (Conservé) ---
    var ORI_TEXT = new WeakMap(); var ORI_ATTR = new WeakMap(); var CURRENT_LANG = "fr";
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
            if (!ORI_TEXT.has(el)) ORI_TEXT.set(el, el.textContent);
            if (CURRENT_LANG === "fr") { el.textContent = ORI_TEXT.get(el); }
            else if (dict && dict[key]) { el.textContent = dict[key]; }
            else { el.textContent = ORI_TEXT.get(el); }
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
        CURRENT_LANG = lang; document.documentElement.lang = lang; applyAll();
        var sel = document.getElementById("langSelect"); if (sel) sel.value = lang;
        try { localStorage.setItem("guillet_lang", lang); } catch(e){}
    };
    window.changeLanguage = function(lang){ window.applyLanguage(lang); };

    document.addEventListener("DOMContentLoaded", function(){
        var saved = "fr"; try { saved = localStorage.getItem("guillet_lang") || "fr"; } catch(e){}
        if (!window.TRANSLATIONS[saved] && saved !== "fr") saved = "fr";
        if (saved !== "fr") setTimeout(function(){ window.applyLanguage(saved); }, 150);
    });

    // --- 12. SCRIPT MAINTENANCE ---
    (function(){
        var FORCER_MAINTENANCE = false; // <-- METTRE TRUE POUR ACTIVER LA MAINTENANCE
        
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

    // =========================================================================
    // --- 13. PANIER & PAIEMENT STRIPE (NOUVEAU MODULE INTÉGRÉ) ---
    // =========================================================================
    const STORAGE_KEY = 'guillet_cart_v1';

    function getCart() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
        catch(e) { return []; }
    }

    function saveCart(cart) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        updateCartBadge();
    }

    function updateCartBadge() {
        const cart = getCart();
        const total = cart.reduce((sum, item) => sum + item.qty, 0);
        const badge = document.getElementById('panierCount');
        if (badge) {
            badge.textContent = total;
            badge.style.display = total > 0 ? 'inline-block' : 'none';
        }
    }

    function showCartToast(msg) {
        let t = document.getElementById('cartToast');
        if (!t) {
            t = document.createElement('div');
            t.id = 'cartToast';
            t.style.cssText = 'position:fixed;bottom:110px;right:1rem;z-index:10000;background:linear-gradient(135deg,#ffd700,#b8860b);color:#000;padding:.9rem 1.4rem;border-radius:12px;font-weight:700;font-family:sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.5);transition:opacity .3s;';
            document.body.appendChild(t);
        }
        t.textContent = msg;
        t.style.opacity = '1';
        clearTimeout(t._timer);
        t._timer = setTimeout(() => { t.style.opacity = '0'; }, 2500);
    }

    function addToCart(btn) {
        const name = btn.dataset.productName || 'Produit';
        const price = parseFloat(btn.dataset.productPrice || '0');
        const image = btn.dataset.productImage || '';
        const priceId = btn.dataset.stripePriceId || '';
        
        if (!priceId) {
            alert('Erreur : ID de prix Stripe manquant pour ce produit.');
            return;
        }

        const cart = getCart();
        const existing = cart.find(item => item.priceId === priceId);
        
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name, price, image, priceId, qty: 1 });
        }
        
        saveCart(cart);
        showCartToast(`✅ ${name} ajouté au panier`);
    }

    function removeFromCart(index) {
        const cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        renderCartModal();
    }

    function clearCart() {
        if (confirm('Voulez-vous vraiment vider votre panier ?')) {
            localStorage.removeItem(STORAGE_KEY);
            updateCartBadge();
            renderCartModal();
        }
    }

    function renderCartModal() {
        const container = document.getElementById('cartItems');
        const footer = document.getElementById('cartFooter');
        if (!container) return;
        
        const cart = getCart();

        if (cart.length === 0) {
            container.innerHTML = '<p style="text-align:center;opacity:.7;padding:2rem 0;">Votre panier est vide.</p>';
            footer.innerHTML = '';
            return;
        }

        container.innerHTML = cart.map((item, i) => `
            <div style="display:flex;gap:1rem;align-items:center;border-bottom:1px solid rgba(255,215,0,.2);padding:.9rem 0;">
                ${item.image ? `<img src="${item.image}" alt="" style="width:60px;height:60px;object-fit:cover;border-radius:8px;border:1px solid rgba(255,215,0,.3);">` : ''}
                <div style="flex:1;">
                    <div style="font-weight:700;color:#ffd700;">${item.name}</div>
                    <div style="font-size:.85rem;opacity:.8;">${item.price.toFixed(2)} € × ${item.qty}</div>
                </div>
                <div style="font-weight:700;">${(item.price * item.qty).toFixed(2)} €</div>
                <button type="button" onclick="window.removeFromCartGlobal(${i})" style="background:transparent;border:1px solid #e10600;color:#e10600;width:32px;height:32px;border-radius:50%;cursor:pointer;">×</button>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

        footer.innerHTML = `
            <div style="display:flex;justify-content:space-between;font-size:1.2rem;font-weight:700;margin-bottom:1rem;">
                <span>Total</span>
                <span style="color:#ffd700;">${total.toFixed(2)} €</span>
            </div>
            <button type="button" id="cartCheckout" style="width:100%;padding:1rem;background:linear-gradient(135deg,#ffd700,#b8860b);color:#000;border:1px solid #ffd700;border-radius:12px;font-weight:700;font-size:1rem;cursor:pointer;margin-bottom:.6rem;">
                💳 Payer avec Stripe
            </button>
            <button type="button" onclick="window.clearCartGlobal()" style="width:100%;padding:.8rem;background:transparent;color:#e10600;border:1px solid #e10600;border-radius:12px;font-weight:700;cursor:pointer;">
                🗑️ Vider le panier
            </button>
        `;

        const checkoutBtn = document.getElementById('cartCheckout');
        if (checkoutBtn) checkoutBtn.addEventListener('click', processCheckout);
    }

    function openCartModal() {
        let modal = document.getElementById('cartModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'cartModal';
            modal.style.cssText = 'position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.92);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:1rem;';
            modal.innerHTML = `
                <div style="background:#101010;border:2px solid #ffd700;border-radius:18px;max-width:560px;width:100%;max-height:85vh;overflow-y:auto;padding:1.8rem;color:#fff;font-family:sans-serif;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.2rem;">
                        <h2 style="margin:0;color:#ffd700;font-size:1.3rem;">🛒 Votre panier</h2>
                        <button type="button" onclick="window.closeCartModalGlobal()" style="background:transparent;border:1px solid #fff;color:#fff;width:36px;height:36px;border-radius:50%;font-size:1.2rem;cursor:pointer;">×</button>
                    </div>
                    <div id="cartItems"></div>
                    <div id="cartFooter" style="margin-top:1.5rem;"></div>
                </div>
            `;
            document.body.appendChild(modal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) window.closeCartModalGlobal();
            });
        }
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
        renderCartModal();
    }

    window.closeCartModalGlobal = function() {
        const modal = document.getElementById('cartModal');
        if (modal) modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
    };

    window.removeFromCartGlobal = function(index) { removeFromCart(index); };
    window.clearCartGlobal = function() { clearCart(); };

    async function processCheckout() {
        const cart = getCart();
        if (cart.length === 0) return;

        const btn = document.getElementById('cartCheckout');
        const originalText = btn ? btn.textContent : '';
        if (btn) { btn.disabled = true; btn.textContent = '⏳ Redirection…'; }

        try {
            const res = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart.map(item => ({ priceId: item.priceId, qty: item.qty }))
                })
            });

            const data = await res.json();
            if (!res.ok || !data.url) throw new Error(data.error || 'Erreur de paiement.');
            
            window.location.href = data.url; 
        } catch (err) {
            alert('❌ ' + err.message);
            if (btn) { btn.disabled = false; btn.textContent = originalText; }
        }
    }

    // Branchement des boutons d'ajout au panier
    document.querySelectorAll('[data-lecart-add]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(btn);
        });
    });

    // Branchement du bouton panier flottant
    const openCartBtn = document.querySelector('[data-lecart-open]');
    if (openCartBtn) {
        openCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCartModal();
        });
    }

    updateCartBadge();

    // Gestion du retour de Stripe (succès / annulation)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('checkout') === 'success') {
        showCartToast('🎉 Paiement réussi — merci pour votre commande !');
        localStorage.removeItem(STORAGE_KEY);
        updateCartBadge();
        history.replaceState({}, '', window.location.pathname);
    } else if (urlParams.get('checkout') === 'cancel') {
        showCartToast('❌ Paiement annulé.');
        history.replaceState({}, '', window.location.pathname);
    }

});