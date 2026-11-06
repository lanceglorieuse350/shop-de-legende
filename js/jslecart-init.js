document.addEventListener('DOMContentLoaded', function() {
  if (typeof LeCart === 'undefined' || typeof LeCart.init !== 'function') {
    console.warn('[LeCart] Bibliothèque non chargée.');
    return;
  }
  try {
    LeCart.init({
      lecartApiKey: 'lecart_-OZUZIxqFq8ZRfpbY1dSpoAz1SZRu2vwl9hjce7odpU',
      checkoutEndpoint: 'https://api.getlecart.com/create-checkout',
      stripePublicKey: 'pk_live_51UNkYQRNu37iEZT9JFa1lJZFQ2eVox5wR6oSjl7A4MznYh5RypGYCqDTFVoaLrPEsV5r5XFRlLYmv85c6bzq8qCq00zNEhZHTn',
      currency: 'EUR',
      language: 'fr',
      theme: 'dark',
      collectShippingAddress: true,
      collectPhoneNumber: true
    });
  } catch(e) {
    console.error('[LeCart] Erreur :', e);
  }
});