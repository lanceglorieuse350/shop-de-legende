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
        
        // 👉 CORRECTION ICI : On force la fermeture de la modale Harcèlement avant de naviguer
        if (typeof window.fermerPrevention === "function") {
          window.fermerPrevention();
        }

        const target = navLink.getAttribute('data-nav');
        const section = navLink.getAttribute('data-section');
        window.navigateTo(target, section);
      }
      
      if (e.target.closest('[data-close-prevention]')) {
        e.preventDefault();
        window.fermerPrevention();
      }
      
      if (e.target.closest('[data-open-prevention]')) {
        e.preventDefault();
        window.ouvrirPrevention();
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
          
          // 👉 CORRECTION ICI AUSSI : On ferme la modale au clavier
          if (typeof window.fermerPrevention === "function") {
            window.fermerPrevention();
          }

          window.navigateTo(navLink.getAttribute('data-nav'), navLink.getAttribute('data-section'));
        }
        const zoomImg = e.target.closest('[data-zoom]');
        if (zoomImg) {
          e.preventDefault();
          window.ouvrirZoom(zoomImg.src);
        }
      }
    });

    const modeBtn = document.querySelector('.mode-btn');
    if (modeBtn) {
      modeBtn.addEventListener('click', () => {
        document.body.classList.toggle("light-mode");
        try { localStorage.setItem("guillet_mode", document.body.classList.contains("light-mode") ? "light" : "dark"); } catch(e){}
      });
    }

    // ==========================================
    // 2. PREVENTION MODAL
    // ==========================================
    window.ouvrirPrevention = function(){
      document.getElementById("prevention-page").classList.add("open");
      document.body.style.overflow = "hidden";
      if (typeof window.actualiserBoutonHaut === "function") window.actualiserBoutonHaut();
      if (typeof window.reapplyLanguage === "function") setTimeout(window.reapplyLanguage, 120);
    };
    window.fermerPrevention = function(){
      document.getElementById("prevention-page").classList.remove("open");
      document.body.style.overflow = "";
      if (typeof window.actualiserBoutonHaut === "function") window.actualiserBoutonHaut();
    };

    // ==========================================
    // 3. RETOUR EN HAUT & SCROLL
    // ==========================================
    const topBtn = document.getElementById('top');
    if (topBtn) {
      topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        var m = document.getElementById("prevention-page");
        if (m && m.classList.contains("open")) m.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    window.actualiserBoutonHaut = function(){
      var b = document.getElementById("top"); if (!b) return;
      var w = window.scrollY > 200;
      var m = document.getElementById("prevention-page");
      var ms = m && m.classList.contains("open") && m.scrollTop > 200;
      if (w || ms) b.classList.add("visible");
      else b.classList.remove("visible");
    };
    window.addEventListener("scroll", window.actualiserBoutonHaut, { passive: true });

    // ==========================================
    // 4. AUDIO & MUSIQUE
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
    // 5. DETAILS PRODUITS (Voir plus)
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
    // 6. FORMULAIRE CONTACT
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
    // 7. ZOOM IMAGES
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
    // 8. RECHERCHE
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
    // 9. CHATBOT (Sécurisé contre les failles XSS)
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

    // FONCTION CLÉ XSS : addMsgText utilise strictement textContent pour les messages utilisateur
    function addMsgText(text, ty){
      if (!cm) return;
      var m = document.createElement("div");
      m.className = "chat-msg " + (ty || "user");
      m.textContent = text; // SÉCURISÉ : Pas d'innerHTML ici
      cm.appendChild(m);
      cm.scrollTop = cm.scrollHeight;
    }

    function addMsg(html, ty, o, key){
      if (!cm) return;
      var m = document.createElement("div");
      m.className = "chat-msg " + (ty || "bot");
      if (key) m.dataset.i18nKey = key;
      m.innerHTML = html; // Utilisé uniquement pour les réponses statiques du bot (non contrôlées par l'utilisateur)
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

    window.retranslateChat = function(){
      var dict = window.__getDict ? window.__getDict() : null;
      var cm2 = document.getElementById("chat-messages");
      if (!cm2) return;
      cm2.querySelectorAll(".chat-msg.bot[data-i18n-key]").forEach(function(el){
        var key = el.dataset.i18nKey;
        if (dict && dict[key]) {
          el.innerHTML = dict[key];
        } else if (key === "chat_hello") {
          el.innerHTML = "👋 Bonjour et bienvenue chez <strong>GUILLET IV</strong> !";
        } else if (key === "chat_prompt") {
          el.innerHTML = "Posez-moi une question :";
        } else if (key === "chat_unknown") {
          el.innerHTML = "Je ne suis pas sûr de bien comprendre 🤔";
        }
      });
      cm2.querySelectorAll(".chat-option[data-i18n-key]").forEach(function(el){
        var key = el.dataset.i18nKey;
        if (dict && dict[key]) {
          el.textContent = dict[key];
        }
      });
      if (ci) {
        var phKey = "ask_question";
        if (dict && dict[phKey]) ci.placeholder = dict[phKey];
        else ci.placeholder = "Posez-moi une question...";
      }
    };

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
        { labelKey: "chat_btn_harass", label: "🚨 Harcèlement", action: function(){ ouvrirPrevention(); toggleChatbot(); } }
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

    // Initialisation au chargement
    var ih = window.location.hash.replace("#", "") || "accueil";
    var cp = ["accueil","apropos","vinted","ongles-beaute","parrainage","prevention-cyber","mentions","cgv","confidentialite","faq","contact"];
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
  });
})();