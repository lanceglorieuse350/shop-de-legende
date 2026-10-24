        var sl = document.querySelectorAll(".hero-slide"); var cs = 0;
        if (sl.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setInterval(function(){ cs = (cs + 1) % sl.length; sl.forEach(function(s, p){ s.classList.toggle("active", p === cs); }); }, 5000);
        }
    });

    // --- 11. TRADUCTEUR MULTILINGUE ---
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

    // --- 12. SCRIPT MAINTENANCE (AJOUTÉ ICI) ---
    (function(){
        var FORCER_MAINTENANCE = true; // <-- METTRE TRUE POUR ACTIVER LA MAINTENANCE
        
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

})();