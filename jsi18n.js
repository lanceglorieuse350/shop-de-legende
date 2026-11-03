(function(){
  "use strict";
  var ORI_TEXT = new WeakMap(), ORI_ATTR = new WeakMap(), ORI_HTML = new WeakMap(), CURRENT_LANG = "fr";
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
        var tag = p.tagName;
        if (["SCRIPT","STYLE","NOSCRIPT","CODE","TEXTAREA"].indexOf(tag) !== -1) return NodeFilter.FILTER_REJECT;
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
    if (typeof window.retranslateChat === "function") window.retranslateChat();
    applyAll();
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