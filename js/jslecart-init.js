document.addEventListener('DOMContentLoaded', function() {
  if (typeof LeCart === 'undefined' || typeof LeCart.init !== 'function') {
    console.warn('[LeCart] Bibliothèque non chargée.');
    return;
  }

  const baseUrl = window.location.origin + window.location.pathname;

  try {
    LeCart.init({
      // ✅ Clé PUBLIQUE LeCart (celle de votre capture d'écran)
      lecartApiKey: 'lecart_QFARqlmd0rNhYWqJdJPcZ8YZpfRlEWKsNmhnXgVxkDg',
      
      // ✅ API directe LeCart
      checkoutEndpoint: 'https://api.getlecart.com/create-checkout',
      
      // ✅ Clé PUBLIQUE Stripe
      stripePublicKey: 'pk_live_51UNkYQRNu37iEZT9JFa1lJZFQ2eVox5wR6oSjl7A4MznYh5RypGYCqDTFVoaLrPEsV5r5XFRlLYmv85c6bzq8qCq00zNEhZHTn',
      
      currency: 'EUR',
      language: 'fr',
      theme: 'dark',
      collectShippingAddress: true,
      collectPhoneNumber: true,
      
      successUrl: baseUrl + '?checkout=success',
      cancelUrl:  baseUrl + '?checkout=cancel'
    });
    console.log('[LeCart] ✅ Initialisé avec succès');
  } catch(e) {
    console.error('[LeCart] ❌ Erreur d\'initialisation :', e);
    return;
  }

  // Gestion du retour après paiement
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