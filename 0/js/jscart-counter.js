(function(){
  "use strict";
  function majCompteur() {
    var badge = document.getElementById("panierCount");
    if (!badge) return;
    var count = 0;
    try {
      var cart = JSON.parse(localStorage.getItem("lecart_cart") || "[]");
      if (Array.isArray(cart)) count = cart.length;
      if (count === 0) {
        var cart2 = JSON.parse(localStorage.getItem("lecart-cart") || "[]");
        if (Array.isArray(cart2)) count = cart2.length;
      }
    } catch(e) { count = 0; }
    if (typeof LeCart !== 'undefined' && typeof LeCart.getCart === 'function') {
      try {
        var c = LeCart.getCart();
        if (Array.isArray(c)) count = c.length;
      } catch(e) {}
    }
    if (count > 0) { badge.style.display = "inline-block"; badge.textContent = count; }
    else { badge.style.display = "none"; }
  }
  document.addEventListener("DOMContentLoaded", majCompteur);
  window.addEventListener("lecart:cart-updated", majCompteur);
  window.addEventListener("lecart:updated", majCompteur);
  window.addEventListener("lecart:item-added", majCompteur);
  window.addEventListener("lecart:item-removed", majCompteur);
  window.addEventListener("lecart:quantity-changed", majCompteur);
  window.addEventListener("storage", function(e) { if (e.key && (e.key.includes("lecart") || e.key.includes("cart"))) majCompteur(); });
  setInterval(majCompteur, 1500);
  document.addEventListener("click", function(e){
    var btn = e.target.closest("[data-lecart-add]");
    if (btn) {
      var badge = document.getElementById("panierCount");
      if (badge) {
        badge.classList.remove("bump");
        void badge.offsetWidth;
        badge.classList.add("bump");
        setTimeout(function(){ badge.classList.remove("bump"); }, 500);
      }
      setTimeout(majCompteur, 300);
      setTimeout(majCompteur, 800);
    }
  });
})();