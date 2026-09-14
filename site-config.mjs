// Only these files may be served or included in a public deployment.
export const publicFiles = new Map([
  ['index.html', 'text/html; charset=utf-8'],
  ['hakkimda.html', 'text/html; charset=utf-8'],
  ['calismalar.html', 'text/html; charset=utf-8'],
  ['iletisim.html', 'text/html; charset=utf-8'],
  ['style.css', 'text/css; charset=utf-8'],
  ['script.js', 'text/javascript; charset=utf-8'],
  ['favicon.svg', 'image/svg+xml'],
  ['assets/alps.png', 'image/png'],
]);

export const contentPolicy = "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; base-uri 'none'; form-action 'none'";
export const securityHeaders = {
  'Content-Security-Policy': `${contentPolicy}; frame-ancestors 'none'`,
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};
