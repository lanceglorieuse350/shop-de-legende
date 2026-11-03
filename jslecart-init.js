document.addEventListener('DOMContentLoaded', function() {
  if (typeof LeCart === 'undefined' || typeof LeCart.init !== 'function') {
    console.warn('[LeCart] Bibliothèque non chargée.'); return;
  }
  try {
    LeCart.init({
      lecartApiKey: 'lecart_0-Bbby0TVjcRqMSvtHx0iZ-ELLmhAKUTFyJFYkIGwlY',
      checkoutEndpoint: 'https://api.getlecart.com/create-checkout',
      stripePublicKey: 'pk_live_51UNkYQRNu37iEZT9IHDIDELHXsO4A5R2ppIQKlBEpev5Q4XX6qRjrTpVHRzcVgaKdykQEm8kVDLKkBXcdPIu33UV008Oeu1wN7',
      currency: 'EUR', language: 'fr', theme: 'dark',
      collectShippingAddress: true, collectPhoneNumber: true
    });
  } catch(e) { console.error('[LeCart] Erreur :', e); }
});