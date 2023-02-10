import { Request, Response } from '../../../types';

/**
 * Global middleware, ensures myriads of imperative security headers.
 * - `HSTS` - 1 Year
 * - `X-Frame-Options` - Clickjacking
 * - `XSS`
 * - `X-Content-Type-Options`
 * - `CSP`
 * - `Cache-Control` - 7 days
 * - `Set-Cookie`
 * - `X-Download-Options`: IE8 HTML file download
 * - `Referrer-Policy`: Referrer information
 * - `X-DNS-Prefetch-Control` - Reduces latency
 * - `Expect-CT` - Certificate transparency
 * - CORP
 * - Permissions Policy
 * - Removes `X-Powered-By`
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {String} next Callback function name
 */

export const security = (req: Request, res: Response, next: () => void) => {
  res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains; preload');
  res.setHeader('X-Frame-Options', 'deny');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // TODO: script-src nounce https://developers.google.com/tag-platform/tag-manager/web/csp
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none';connect-src 'https://region1.google-analytics.com' 'self';base-uri 'self';block-all-mixed-content;font-src 'self';form-action 'self';frame-ancestors 'none';img-src 'self';object-src 'none';script-src 'https://www.googletagmanager.com' 'self';script-src-attr 'self';style-src 'self';upgrade-insecure-requests",
  );
  res.setHeader('Cache-Control', 'no-cache, must-revalidate, max-age=604800');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('X-Download-Options', 'noopen');
  res.setHeader('X-DNS-Prefetch-Control', 'on');
  res.setHeader('Expect-CT', 'max-age=0,enforce');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader(
    'Permissions-Policy',
    'fullscreen=(self),microphone=(),camera=(),payment=(),geolocation=(),display-capture=(),battery=(),autoplay=(),gyroscope=(),accelerometer=(),web-share=(),usb=(),gamepad=(),magnetometer=(),midi=(),picture-in-picture=(),xr-spatial-tracking=()',
  );

  res.removeHeader('X-Powered-By');
  next();
};
