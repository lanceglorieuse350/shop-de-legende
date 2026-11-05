document.addEventListener('DOMContentLoaded', function() {
  if (typeof LeCart === 'undefined' || typeof LeCart.init !== 'function') {
    console.warn('[LeCart] Bibliothèque non chargée.');
    return;
  }
  try {
    LeCart.init({
      lecartApiKey: 'lecart_QFARqlmd0rNhYWqJdJPcZ8YZpfRlEWKsNmhnXgVxkDg',
      checkoutEndpoint: 'https://api.getlecart.com/create-checkout',
      stripePublicKey: 'pk_live_51UNkYQRNu37iEZT9JFa1lJZFQ2eVox5wR6oSjl7A4MznYh5RypGYCqDTFVoaLrPEsV5r5XFRlLYmv85c6bzq8qCq00zNEhZHTn',
      currency: 'EUR',
      language: 'fr',
      theme: 'dark',
      collectShippingAddress: true,
      collectPhoneNumber: true,

      // ✅ LIGNE AJOUTÉE : Transmet le token Supabase à LeCart
      getAuthToken: async function() {
        if (window.supabaseClient) {
          const { data: { session } } = await window.supabaseClient.auth.getSession();
          return session ? session.access_token : null;
        }
        return null;
      }
    });
  } catch(e) {
    console.error('[LeCart] Erreur :', e);
  }
});