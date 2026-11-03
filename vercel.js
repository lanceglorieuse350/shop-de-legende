export const config = {
  matcher: '/(.*)',
};

export default function middleware(request) {
  const response = new Response(null);
  
  // Configuration stricte SANS 'unsafe-inline' et SANS 'unsafe-eval'
  const cspHeader = `
    default-src 'self';
    script-src 'self' https://unpkg.com https://js.stripe.com https://va.vercel-scripts.com;
    style-src 'self' https://unpkg.com https://fonts.googleapis.com;
    img-src 'self' data: https://flagcdn.com https://*.stripe.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://api.getlecart.com https://api.stripe.com https://va.vercel-scripts.com https://vitals.vercel-insights.com;
    frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com https://buy.stripe.com;
    media-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  const headers = new Headers(response.headers);
  
  // Injection de la CSP stricte
  headers.set('Content-Security-Policy', cspHeader);
  
  // Autres en-têtes de sécurité
  headers.set('X-DNS-Prefetch-Control', 'off');
  headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  headers.set('Access-Control-Allow-Origin', 'https://shop-de-legende.vercel.app');
  
  return new Response(null, {
    headers
  });
}