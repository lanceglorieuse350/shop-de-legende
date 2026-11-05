document.addEventListener('DOMContentLoaded', function() {
  if (typeof LeCart === 'undefined' || typeof LeCart.init !== 'function') {
    console.warn('[LeCart] Bibliothèque non chargée.');
    return;
  }

  // ✅ On construit l'URL de base sans le hash (#accueil) pour Stripe
  const baseUrl = window.location.origin + window.location.pathname;

  try {
    LeCart.init({
      lecartApiKey: 'lecart_QFARqlmd0rNhYWqJdJPcZ8YZpfRlEWKsNmhnXgVxkDg',
      checkoutEndpoint: 'https://api.getlecart.com/create-checkout',
      stripePublicKey: 'pk_live_51UNkYQRNu37iEZT9IHDIDELHXsO4A5R2ppIQKlBEpev5Q4XX6qRjrTpVHRzcVgaKdykQEm8kVDLKkBXcdPIu33UV008Oeu1wN7',
      currency: 'EUR',
      language: 'fr',
      theme: 'dark',
      collectShippingAddress: true,
      collectPhoneNumber: true,
      
      // ✅ URLs de redirection (Indispensable pour éviter l'erreur 400)
      successUrl: baseUrl + '?checkout=success',
      cancelUrl:  baseUrl + '?checkout=cancel'
    });
    console.log('[LeCart] ✅ Initialisé avec succès');
  } catch(e) {
    console.error('[LeCart] ❌ Erreur d\'initialisation :', e);
    return;
  }

  // ✅ GESTION DU RETOUR STRIPE (Affiche le message après le paiement)
  const urlParams = new URLSearchParams(window.location.search);
  const checkoutStatus = urlParams.get('checkout');

  if (checkoutStatus === 'success') {
    setTimeout(function() {
      alert('✅ Paiement réussi ! Merci pour votre commande.\n\nUn e-mail de confirmation vous sera envoyé.');
      window.history.replaceState({}, '', window.location.pathname + '#accueil');
    }, 500);
  } else if (checkoutStatus === 'cancel') {
    setTimeout(function() {
      alert('❌ Paiement annulé.\n\nVotre panier est conservé si vous souhaitez réessayer.');
      window.history.replaceState({}, '', window.location.pathname + '#accueil');
    }, 500);
  }
});