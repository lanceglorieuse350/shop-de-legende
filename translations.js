(function(){
    "use strict";

    // --- INITIALISATION LECART ---
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof LeCart === 'undefined' || typeof LeCart.init !== 'function') {
            console.warn('[LeCart] Bibliothèque non chargée — le panier est désactivé.');
            return;
        }
        try {
            LeCart.init({
                lecartApiKey: 'lecart_0-Bbby0TVjcRqMSvtHx0iZ-ELLmhAKUTFyJFYkIGwlY', 
                checkoutEndpoint: '/api/checkout', 
                stripePublicKey: 'pk_live_51UNkYQRNu37iEZT9IHDIDELHXsO4A5R2ppIQKlBEpev5Q4XX6qRjrTpVHRzcVgaKdykQEm8kVDLKkBXcdPIu33UV008Oeu1wN7',
                currency: 'EUR',
                language: 'fr',
                theme: 'dark',
                collectShippingAddress: true,
                collectPhoneNumber: true
            });
        } catch(e) {
            console.error('[LeCart] Erreur d\'initialisation :', e);
        }
    });

    // --- FONCTIONS UTILITAIRES ---
    window.payer = function(b64){ try { window.open(atob(b64), "_blank", "noopener,noreferrer"); } catch(e){ console.error("Erreur de paiement."); } };
    function esc(str){ return String(str).replace(/[&<>'"]/g, function(t){ return {"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[t]; }); }

    // --- NAVIGATION ---
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

    window.scrollToElementWithOffset = function(e, o){
        if (o === undefined) o = 80; if (!e) return;
        window.scrollTo({ top: e.getBoundingClientRect().top + window.pageYOffset - o, behavior: "smooth" });
    };

    window.scrollInPreventionModal = function(a, o){
        if (o === undefined) o = 80;
        var m = document.getElementById("prevention-page"); var e = document.getElementById(a);
        if (!m || !e) return;
        m.scrollTo({ top: Math.max(0, m.scrollTop + (e.getBoundingClientRect().top - m.getBoundingClientRect().top) - o), behavior: "smooth" });
    };

    window.activerPageCyberEtScroll = function(a, p){
        if (p === undefined) p = true;
        document.querySelectorAll(".page-section").forEach(function(s){ s.classList.remove("active"); });
        var c = document.getElementById("page-prevention-cyber"); if (c) c.classList.add("active");
        var m = document.getElementById("prevention-page");
        if (m && m.classList.contains("open")) { m.classList.remove("open"); document.body.style.overflow = ""; }
        try { if (p) history.pushState(null, null, "#" + a); else history.replaceState(null, null, "#" + a); } catch(e){}
        document.querySelectorAll(".nav-link").forEach(function(l){ l.classList.remove("active-link"); if (l.getAttribute("href") === "#prevention-cyber") l.classList.add("active-link"); });
        setTimeout(function(){ var e = document.getElementById(a); if (e) scrollToElementWithOffset(e, 80); }, 50);
        if (typeof window.reapplyLanguage === "function") setTimeout(window.reapplyLanguage, 120);
    };

    window.ouvrirPrevention = function(){
        document.getElementById("prevention-page").classList.add("open");
        document.body.style.overflow = "hidden";
        actualiserBoutonHaut();
        if (typeof window.reapplyLanguage === "function") setTimeout(window.reapplyLanguage, 120);
    };
    window.fermerPrevention = function(){
        document.getElementById("prevention-page").classList.remove("open");
        document.body.style.overflow = "";
        actualiserBoutonHaut();
    };
    window.retourEnHaut = function(){
        window.scrollTo({ top: 0, behavior: "smooth" });
        var m = document.getElementById("prevention-page");
        if (m && m.classList.contains("open")) m.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.actualiserBoutonHaut = function(){
        var b = document.getElementById("top"); if (!b) return;
        var w = window.scrollY > 200;
        var m = document.getElementById("prevention-page");
        var ms = m && m.classList.contains("open") && m.scrollTop > 200;
        b.style.display = (w || ms) ? "flex" : "none";
    };

    // --- LECTEUR MUSIQUE ---
    var pl = document.getElementById("player"), ms = document.getElementById("musicSelect"), mms = document.getElementById("miniMusicSelect"), mpb = document.getElementById("miniPlayBtn"), vol = document.getElementById("volumeSlider");
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
    function updBtn(){ if (mpb) mpb.textContent = pl.paused ? "▶️" : "⏸️"; }
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

    window.toggleDetails = function(b){
        var d = b.nextElementSibling;
        var o = b.getAttribute("aria-expanded") !== "true";
        d.style.display = o ? "block" : "none";
        b.setAttribute("aria-expanded", String(o));
        var dict = window.__getDict ? window.__getDict() : null;
        var key = o ? "Voir moins" : "Voir plus";
        b.textContent = (dict && dict[key]) || key;
    };

    window.envoyerMail = function(e){
        if (e) e.preventDefault();
        var n = document.getElementById("nom"), em = document.getElementById("email"), m = document.getElementById("message");
        if (!n || !em || !m) return;
        var nv = n.value.trim(), ev = em.value.trim(), mv = m.value.trim();
        if (!nv || !ev || !mv) { alert("Veuillez remplir tous les champs."); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(ev)) { alert("Adresse email invalide."); return; }
        var mailto = "mailto:lanceglorieuse@gmail.com?subject=" + encodeURIComponent("Message de " + nv) + "&body=" + encodeURIComponent("Email : " + ev + "\n\n" + mv);
        var c = document.getElementById("confirmation");
        if (c) { c.hidden = false; c.style.display = "block"; }
        window.location.href = mailto;
    };

    window.ouvrirZoom = function(s, e){
        if (e) e.stopPropagation();
        window.ancienFocus = document.activeElement;
        document.getElementById("zoomImg").src = s;
        document.getElementById("zoomModal").style.display = "flex";
        document.querySelector(".zoom-close").focus();
    };
    window.fermerZoom = function(){
        document.getElementById("zoomModal").style.display = "none";
        if (window.ancienFocus) { window.ancienFocus.focus(); window.ancienFocus = null; }
    };

    window.toggleMode = function(){
        document.body.classList.toggle("light-mode");
        try { localStorage.setItem("guillet_mode", document.body.classList.contains("light-mode") ? "light" : "dark"); } catch(e){}
    };

    // --- RECHERCHE ---
    var sf = document.getElementById("searchForm"), si = document.getElementById("searchInput"), sc = document.getElementById("clearSearch"), ss = document.getElementById("searchSuggestions"), sr = document.getElementById("searchResults"), sst = document.getElementById("searchStatus"), np = document.getElementById("noProducts");
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
        if (sst) sst.textContent = res.length === 0 ? "Aucun produit trouvé." : res.length + " produit(s) trouvé(s).";
        if (!res.length) {
            var li = document.createElement("li"); li.className = "search-empty"; li.textContent = "Aucun produit trouvé. Essaie un autre mot.";
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
                a.addEventListener("click", function(e){ e.preventDefault(); pick(p); });
            });
        }
        if (showSuggestions) show();
    }
    function pick(p){
        navigateTo("accueil");
        si.value = p.nom; filter(false); hide();
        cards.forEach(function(e){ e.carte.classList.remove("search-highlight"); });
        clearTimeout(timer);
        p.carte.classList.add("search-highlight");
        setTimeout(function(){ p.carte.focus({ preventScroll: true }); p.carte.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100);
        timer = setTimeout(function(){ p.carte.classList.remove("search-highlight"); }, 2500);
    }
    var dbt;
    if (si) {
        si.addEventListener("input", function(){ clearTimeout(dbt); dbt = setTimeout(function(){ filter(); }, 200); });
        si.addEventListener("focus", function(){ if (si.value.trim()) filter(); });
        si.addEventListener("keydown", function(e){
            if (e.key === "ArrowDown") { var p = sr ? sr.querySelector("a") : null; if (p) { e.preventDefault(); show(); p.focus(); } }
            if (e.key === "Escape") hide();
        });
    }
    if (sf) {
        sf.addEventListener("submit", function(e){
            e.preventDefault(); filter(false); hide();
            if (!si.value.trim()) return;
            if (res.length === 1) pick(res[0]);
            else { navigateTo("accueil"); setTimeout(function(){ var p = document.getElementById("produits"); if (p) p.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100); }
        });
    }
    if (sc) sc.addEventListener("click", function(){ si.value = ""; filter(false); si.focus(); });
    document.addEventListener("click", function(e){ if (sf && !sf.contains(e.target)) hide(); });

    // --- CHATBOT ---
    var cw = document.getElementById("chatbot-window"), cm = document.getElementById("chat-messages"), ci = document.getElementById("chat-input");
    window.toggleChatbot = function(){
        window.chatOuvert = !window.chatOuvert;
        if (window.chatOuvert) { if (cw) cw.classList.add("open"); if (cm && cm.children.length === 0) initChat(); setTimeout(function(){ if (ci) ci.focus(); }, 300); }
        else { if (cw) cw.classList.remove("open"); }
    };
    window.envoyerMessageChat = function(tF){
        if (tF === undefined) tF = null;
        var t = tF || (ci ? ci.value.trim() : ""); if (!t) return;
        if (!tF) addMsgText(t, "user");
        if (ci) ci.value = "";
        var dict = window.__getDict ? window.__getDict() : null;
        var lang = document.getElementById("langSelect").value;
        var m = match(t);
        if (m) {
            var txt = (dict && dict[m.reponse]) ? dict[m.reponse] : m.reponse;
            var opts = m.options ? m.options.map(function(o){ return { label: (dict && dict[o.label]) ? dict[o.label] : o.label, action: o.action }; }) : null;
            reply(txt, opts);
        } else {
            var defaultMsg = lang === 'fr' ? "Je ne suis pas sûr de bien comprendre 🤔 Voici ce que je sais faire :" : (lang === 'en' ? "I'm not sure I understand 🤔 Here is what I can do:" : (lang === 'ru' ? "Я не уверен, что понимаю 🤔 Вот что я умею:" : "Я не впевнений, що розумію 🤔 Ось що я вмію:"));
            reply(defaultMsg, [
                { label: dict ? dict["📋 Voir toutes les pages"] : "📋 Voir toutes les pages", action: function(){ envoyerMessageChat("menu"); } },
                { label: dict ? dict["💶 Voir les prix"] : "💶 Voir les prix", action: function(){ envoyerMessageChat("prix"); } },
                { label: dict ? dict["📞 Vous contacter"] : "📞 Vous contacter", action: function(){ envoyerMessageChat("contact"); } },
                { label: dict ? dict["🚚 Livraison"] : "🚚 Livraison", action: function(){ envoyerMessageChat("livraison"); } }
            ]);
        }
    };
    function addMsg(html, ty, o){
        if (ty === undefined) ty = "bot";
        if (o === undefined) o = null;
        if (!cm) return;
        var m = document.createElement("div");
        m.className = "chat-msg " + ty;
        m.innerHTML = html; // uniquement pour HTML contrôlé (intents)
        cm.appendChild(m);
        if (o && o.length) {
            var z = document.createElement("div"); z.className = "chat-options";
            o.forEach(function(opt){
                var b = document.createElement("button");
                b.type = "button"; b.className = "chat-option"; b.textContent = opt.label;
                b.onclick = function(){ addMsgText(opt.label, "user"); opt.action(); };
                z.appendChild(b);
            });
            cm.appendChild(z);
        }
        cm.scrollTop = cm.scrollHeight;
    }
    function addMsgText(text, ty){
        if (ty === undefined) ty = "user";
        if (!cm) return;
        var m = document.createElement("div");
        m.className = "chat-msg " + ty;
        m.textContent = text;
        cm.appendChild(m);
        cm.scrollTop = cm.scrollHeight;
    }
    function reply(t, o){
        if (o === undefined) o = null;
        if (!cm) return;
        var m = document.createElement("div"); m.className = "chat-msg bot"; m.innerHTML = '<span style="opacity:.6">…</span>';
        cm.appendChild(m); cm.scrollTop = cm.scrollHeight;
        setTimeout(function(){ m.remove(); addMsg(t, "bot", o); }, 500);
    }
    function initChat(){
        var lang = document.getElementById("langSelect").value;
        var dict = window.__getDict ? window.__getDict() : null;
        var hello = lang === 'fr' ? "👋 Bonjour et bienvenue chez <strong>GUILLET IV</strong> ! Je suis votre assistant virtuel." : (lang === 'en' ? "👋 Hello and welcome to <strong>GUILLET IV</strong>! I am your virtual assistant." : (lang === 'ru' ? "👋 Здравствуйте и добро пожаловать в <strong>GUILLET IV</strong>! Я ваш виртуальный помощник." : "👋 Вітаю та ласкаво просимо до <strong>GUILLET IV</strong>! Я ваш віртуальний помічник."));
        setTimeout(function(){ addMsg(hello); }, 200);
        setTimeout(function(){
            reply(lang === 'fr' ? "Posez-moi une question ou choisissez un sujet ci-dessous :" : (lang === 'en' ? "Ask me a question or choose a topic below:" : (lang === 'ru' ? "Задайте мне вопрос или выберите тему ниже:" : "Задайте мені питання або виберіть тему нижче:")), [
                { label: dict ? dict["📋 Menu des pages"] : "📋 Menu des pages", action: function(){ envoyerMessageChat("menu"); } },
                { label: dict ? dict["💶 Les prix"] : "💶 Les prix", action: function(){ envoyerMessageChat("prix"); } },
                { label: dict ? dict["🚚 Livraison"] : "🚚 Livraison", action: function(){ envoyerMessageChat("livraison"); } }
            ]);
        }, 900);
    }
    var pay = {
        drone: "aHR0cHM6Ly9idXkuc3RyaXBlLmNvbS8yOEU2b0phb3FkUmc2VlQwTTEwWlcwMQ==",
        projecteur: "aHR0cHM6Ly9idXkuc3RyaXBlLmNvbS9kUm1mWjowTlExNHUxQno3YXAwWlcwMg==",
        endoscope: "aHR0cHM6Ly9idXkuc3RyaXBlLmNvbS83c1llVmZjd3kwMHE2VlRkeU4wWlcwMw=="
    };
    var intents = [
        { intention: "menu", motsCles: ["menu","sommaire","tout","liste","pages"], reponse: "Voici toutes les sections du site :", options: [
            { label: "🏠 Accueil", action: function(){ navigateTo("accueil"); toggleChatbot(); } },
            { label: "🛒 Boutique", action: function(){ navigateTo("accueil"); setTimeout(function(){ var p = document.getElementById("produits"); if (p) p.scrollIntoView({ behavior: "smooth" }); }, 100); toggleChatbot(); } },
            { label: "👕 Vinted", action: function(){ navigateTo("vinted"); toggleChatbot(); } },
            { label: "💅 Ongles & Beauté", action: function(){ navigateTo("ongles-beaute"); toggleChatbot(); } },
            { label: "📜 À propos", action: function(){ navigateTo("apropos"); toggleChatbot(); } },
            { label: "✉️ Contact", action: function(){ navigateTo("contact"); toggleChatbot(); } },
            { label: "❓ FAQ", action: function(){ navigateTo("faq"); toggleChatbot(); } },
            { label: "🛡️ Cybersécurité", action: function(){ navigateTo("prevention-cyber"); toggleChatbot(); } },
            { label: "🛡️ Harcèlement", action: function(){ ouvrirPrevention(); toggleChatbot(); } }
        ] },
        { intention: "contact", motsCles: ["horaire","telephone","mail","contact","appeler","numero","joindre"], reponse: "📞 Nous sommes disponibles de 9h à 20h au <strong>07.80.20.47.49</strong>. Vous pouvez aussi nous écrire à <strong>lanceglorieuse@gmail.com</strong>." },
        { intention: "livraison", motsCles: ["livraison","envoi","delai","colis","recevoir","expedition"], reponse: "🚚 La livraison est <strong>rapide et sécurisée</strong>." },
        { intention: "drone", motsCles: ["drone","ky108","camera","filmer","video"], reponse: "🎥 Le <strong>Drone KY108</strong> (89€) est équipé d'une double caméra HD, d'un zoom 90x.", options: [
            { label: "Voir", action: function(){ navigateTo("accueil"); setTimeout(function(){ var p = document.getElementById("produit-drone"); if (p) p.scrollIntoView({ behavior: "smooth" }); }, 100); toggleChatbot(); } },
            { label: "Acheter", action: function(){ payer(pay["drone"]); } }
        ] },
        { intention: "projecteur", motsCles: ["projecteur","lampe","pir","solaire"], reponse: "💡 Le <strong>Projecteur LED solaire</strong> (35€) fonctionne à l'énergie solaire.", options: [
            { label: "Voir", action: function(){ navigateTo("accueil"); setTimeout(function(){ var p = document.getElementById("produit-projecteur"); if (p) p.scrollIntoView({ behavior: "smooth" }); }, 100); toggleChatbot(); } },
            { label: "Acheter", action: function(){ payer(pay["projecteur"]); } }
        ] },
        { intention: "endoscope", motsCles: ["endoscope","inspect","moteur","tuyau"], reponse: "🔍 L'<strong>Endoscope</strong> (95€) : écran 4.3\", câble 10m, IP68.", options: [
            { label: "Voir", action: function(){ navigateTo("accueil"); setTimeout(function(){ var p = document.getElementById("produit-endoscope"); if (p) p.scrollIntoView({ behavior: "smooth" }); }, 100); toggleChatbot(); } },
            { label: "Acheter", action: function(){ payer(pay["endoscope"]); } }
        ] },
        { intention: "beaute", motsCles: ["ongle","ongles","beaute","beauté","vernis","manucure","nail"], reponse: "💅 La section <strong>Ongles & Beauté</strong> propose prestations en présentiel à Guignen.", options: [
            { label: "Voir la section", action: function(){ navigateTo("ongles-beaute"); toggleChatbot(); } }
        ] },
        { intention: "prix", motsCles: ["prix","tarif","combien","cout"], reponse: "💰 Drone: 89€ • Projecteur: 35€ • Pack Hiver: 99,99€ • Endoscope: 95€" },
        { intention: "merci", motsCles: ["merci","super","parfait","top"], reponse: "Avec plaisir ! 🙏" }
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

    document.addEventListener("DOMContentLoaded", function(){
        // Attacher les événements de navigation (car on a enlevé les onclick)
        document.getElementById('btn-brand').addEventListener('click', function(){ navigateTo('accueil'); });
        document.getElementById('nav-accueil').addEventListener('click', function(e){ e.preventDefault(); navigateTo('accueil'); });
        document.getElementById('nav-apropos').addEventListener('click', function(e){ e.preventDefault(); navigateTo('apropos'); });
        document.getElementById('nav-boutique').addEventListener('click', function(e){ e.preventDefault(); navigateTo('accueil', 'produits'); });
        document.getElementById('nav-vinted').addEventListener('click', function(e){ e.preventDefault(); navigateTo('vinted'); });
        document.getElementById('nav-ongles').addEventListener('click', function(e){ e.preventDefault(); navigateTo('ongles-beaute'); });
        document.getElementById('nav-cyber').addEventListener('click', function(e){ e.preventDefault(); navigateTo('prevention-cyber'); });
        document.getElementById('nav-harcelement').addEventListener('click', function(){ ouvrirPrevention(); });
        document.getElementById('nav-contact').addEventListener('click', function(e){ e.preventDefault(); navigateTo('contact'); });
        document.getElementById('nav-faq').addEventListener('click', function(e){ e.preventDefault(); navigateTo('faq'); });
        document.getElementById('nav-cgv').addEventListener('click', function(e){ e.preventDefault(); navigateTo('cgv'); });
        document.getElementById('nav-mentions').addEventListener('click', function(e){ e.preventDefault(); navigateTo('mentions'); });
        
        // Footer
        document.getElementById('footer-nav-accueil').addEventListener('click', function(e){ e.preventDefault(); navigateTo('accueil'); });
        document.getElementById('footer-nav-apropos').addEventListener('click', function(e){ e.preventDefault(); navigateTo('apropos'); });
        document.getElementById('footer-nav-harcelement').addEventListener('click', function(){ ouvrirPrevention(); });
        document.getElementById('footer-nav-boutique').addEventListener('click', function(e){ e.preventDefault(); navigateTo('accueil', 'produits'); });
        document.getElementById('footer-nav-vinted').addEventListener('click', function(e){ e.preventDefault(); navigateTo('vinted'); });
        document.getElementById('footer-nav-ongles').addEventListener('click', function(e){ e.preventDefault(); navigateTo('ongles-beaute'); });
        document.getElementById('footer-nav-cyber').addEventListener('click', function(e){ e.preventDefault(); navigateTo('prevention-cyber'); });
        document.getElementById('footer-nav-contact').addEventListener('click', function(e){ e.preventDefault(); navigateTo('contact'); });
        document.getElementById('footer-nav-faq').addEventListener('click', function(e){ e.preventDefault(); navigateTo('faq'); });
        document.getElementById('footer-nav-cgv').addEventListener('click', function(e){ e.preventDefault(); navigateTo('cgv'); });
        document.getElementById('footer-nav-mentions').addEventListener('click', function(e){ e.preventDefault(); navigateTo('mentions'); });

        // Boutons Retour
        document.getElementById('btn-back-apropos').addEventListener('click', function(e){ e.preventDefault(); navigateTo('accueil'); });
        document.getElementById('btn-back-vinted').addEventListener('click', function(e){ e.preventDefault(); navigateTo('accueil'); });
        document.getElementById('btn-back-ongles').addEventListener('click', function(e){ e.preventDefault(); navigateTo('accueil'); });
        document.getElementById('btn-back-cyber').addEventListener('click', function(e){ e.preventDefault(); navigateTo('accueil'); });
        document.getElementById('btn-back-mentions').addEventListener('click', function(e){ e.preventDefault(); navigateTo('accueil'); });
        document.getElementById('btn-back-cgv').addEventListener('click', function(e){ e.preventDefault(); navigateTo('accueil'); });
        document.getElementById('btn-back-faq').addEventListener('click', function(e){ e.preventDefault(); navigateTo('accueil'); });
        document.getElementById('btn-back-contact').addEventListener('click', function(e){ e.preventDefault(); navigateTo('accueil'); });

        // Autres boutons
        document.getElementById('btn-mode').addEventListener('click', toggleMode);
        document.getElementById('top').addEventListener('click', retourEnHaut);
        document.getElementById('btn-close-prevention').addEventListener('click', fermerPrevention);
        document.getElementById('btn-close-chatbot').addEventListener('click', toggleChatbot);
        document.getElementById('chatbot-toggle').addEventListener('click', toggleChatbot);
        document.getElementById('chat-send').addEventListener('click', function(){ envoyerMessageChat(); });
        document.getElementById('chat-input').addEventListener('keydown', function(e){ if(e.key==='Enter') envoyerMessageChat(); });
        document.getElementById('miniPlayBtn').addEventListener('click', togglePlayMusique);
        document.getElementById('miniMusicSelect').addEventListener('change', function(){ changerMusique(this.value); });
        document.getElementById('musicSelect').addEventListener('change', function(){ changerMusique(this.value); });
        document.getElementById('contactForm').addEventListener('submit', envoyerMail);
        document.getElementById('langSelect').addEventListener('change', function(){ changeLanguage(this.value); });
        
        // Zoom modal
        document.getElementById('zoomModal').addEventListener('click', fermerZoom);
        document.querySelector('.zoom-close').addEventListener('click', function(e){ e.stopPropagation(); fermerZoom(); });
        
        // Détails produits
        document.querySelectorAll('[data-toggle-details]').forEach(function(btn){
            btn.addEventListener('click', function(){ toggleDetails(this); });
        });

        // Compteur Panier
        function majCompteur(){
            var badge = document.getElementById("panierCount");
            if (!badge) return;
            try {
                var cart = JSON.parse(localStorage.getItem("lecart_cart") || "[]");
                if (!Array.isArray(cart)) { localStorage.removeItem("lecart_cart"); cart = []; }
                var n = cart.length;
                badge.style.display = n > 0 ? "inline-block" : "none";
                badge.textContent = n;
            } catch(e) { badge.style.display = "none"; }
        }
        document.addEventListener("DOMContentLoaded", majCompteur);
        window.addEventListener("lecart:cart-updated", majCompteur);
        window.addEventListener("storage", function(e){ if (e.key === "lecart_cart") majCompteur(); });

        // Gestion du hash au chargement
        var ih = window.location.hash.replace("#", "") || "accueil";
        var cp = ["accueil","apropos","vinted","ongles-beaute","prevention-cyber","mentions","cgv","faq","contact"];
        var ca = ["mots-de-passe","phishing","force-brute","photos-cles","vie-personnelle","loi-hacking","phishing-droit","donnees-personnelles","test-autorise","incident","conclusion-cyber"];
        var ha = ["prevention-moral","prevention-scolaire","prevention-sexuel","prevention-bande","prevention-aide"];
        if (ca.indexOf(ih) !== -1) activerPageCyberEtScroll(ih, false);
        else if (ha.indexOf(ih) !== -1) { ouvrirPrevention(); setTimeout(function(){ scrollInPreventionModal(ih, 80); }, 150); }
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
        document.querySelectorAll(".prevention-summary a").forEach(function(l){
            l.addEventListener("click", function(e){
                var h = l.getAttribute("href");
                if (h && h.startsWith("#")) { var a = h.substring(1); if (ha.indexOf(a) !== -1) { e.preventDefault(); scrollInPreventionModal(a, 80); } }
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
            else if (ha.indexOf(h) !== -1) { ouvrirPrevention(); setTimeout(function(){ scrollInPreventionModal(h, 80); }, 150); }
            else if (cp.indexOf(h) !== -1) navigateTo(h);
            else navigateTo("accueil");
        });

        window.addEventListener("scroll", actualiserBoutonHaut, { passive: true });
        var me = document.getElementById("prevention-page");
        if (me) me.addEventListener("scroll", actualiserBoutonHaut, { passive: true });
        actualiserBoutonHaut();

        document.addEventListener("keydown", function(e){
            if (e.key === "Escape" && document.getElementById("prevention-page").classList.contains("open")) fermerPrevention();
            var m = document.getElementById("zoomModal");
            if (m && m.style.display === "flex" && e.key === "Escape") fermerZoom();
        });

        var sl = document.querySelectorAll(".hero-slide"); var cs = 0;
        if (sl.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setInterval(function(){ cs = (cs + 1) % sl.length; sl.forEach(function(s, p){ s.classList.toggle("active", p === cs); }); }, 5000);
        }
    });

    // --- TRADUCTEUR ---
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

})();