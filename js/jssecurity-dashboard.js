/* ============================================================
   js/security-dashboard.js
   Extrait du <script> IntersectionObserver du security-dashboard.
   Ajoute .is-visible aux .reveal quand ils entrent dans le viewport.
   ============================================================ */
(function () {
  var els = document.querySelectorAll('#security-dashboard .reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (e) { io.observe(e); });
})();