import isRequestHeaderOriginValid from './is-request-header-origin-valid';
import { Request, Response } from '../../../../types';

/**
 * Global middleware, ensures myriads of imperative security headers.
 * - Sanitise request "referer" and "origin" headers
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
  console.log('--> req..hostname ', req.hostname); // eslint-disable-line no-console
  console.log('--> req.headers.referer ', req.headers.referer); // eslint-disable-line no-console
  console.log('--> req.headers.origin ', req.headers.origin); // eslint-disable-line no-console

  const { hostname } = req;

  if (req.headers.referer) {
    if (!isRequestHeaderOriginValid(hostname, req.headers.referer)) {
      req.headers.referer = '';
    }
  }

  if (req.headers.origin) {
    if (!isRequestHeaderOriginValid(hostname, req.headers.origin)) {
      req.headers.origin = '';
    }
  }

  res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains; preload');
  res.setHeader('X-Frame-Options', 'deny');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none';connect-src https://region1.google-analytics.com 'self';base-uri 'self';block-all-mixed-content;font-src 'self' data:;form-action 'self';frame-ancestors 'self';img-src 'self';object-src 'none';script-src https://www.googletagmanager.com 'self' 'unsafe-inline';script-src-attr 'self' 'unsafe-inline';style-src 'self';upgrade-insecure-requests",
  );
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=604800');
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
