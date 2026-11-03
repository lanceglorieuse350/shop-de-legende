(function(){
  "use strict";
  var FORCER_MAINTENANCE = false;
  function getPage(){ return document.getElementById("maintenance-page"); }
  function getContenu(){
    return [
      document.querySelector(".navbar"), document.querySelector(".marquee-bar"),
      document.querySelector(".audio-player"), document.querySelector("main"),
      document.querySelector("footer"), document.querySelector(".music-widget"),
      document.getElementById("chatbot-toggle"), document.getElementById("chatbot-window"),
      document.getElementById("top"), document.getElementById("panierFlottant")
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