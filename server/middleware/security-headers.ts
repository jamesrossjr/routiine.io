/**
 * Security Headers Middleware
 * Adds security headers to all responses
 */
export default defineEventHandler((event) => {
  // Content Security Policy (CSP)
  // Restricts sources for scripts, styles, images, etc.
  setResponseHeader(
    event,
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://github.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: http:",
      "connect-src 'self' https://accounts.google.com https://api.github.com",
      "frame-src 'self' https://accounts.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; '),
  )

  // Prevent clickjacking attacks
  setResponseHeader(event, 'X-Frame-Options', 'DENY')

  // Prevent MIME type sniffing
  setResponseHeader(event, 'X-Content-Type-Options', 'nosniff')

  // Enable XSS protection (for older browsers)
  setResponseHeader(event, 'X-XSS-Protection', '1; mode=block')

  // Referrer Policy - Control referrer information
  setResponseHeader(event, 'Referrer-Policy', 'strict-origin-when-cross-origin')

  // Permissions Policy - Control browser features
  setResponseHeader(
    event,
    'Permissions-Policy',
    [
      'accelerometer=()',
      'camera=()',
      'geolocation=()',
      'gyroscope=()',
      'magnetometer=()',
      'microphone=()',
      'payment=()',
      'usb=()',
    ].join(', '),
  )

  // HTTP Strict Transport Security (HSTS)
  // Only enable in production with HTTPS
  if (process.env.NODE_ENV === 'production') {
    setResponseHeader(
      event,
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload',
    )
  }

  // Prevent caching of sensitive data
  const path = event.path || ''
  if (path.includes('/api/auth') || path.includes('/api/admin')) {
    setResponseHeader(event, 'Cache-Control', 'no-store, no-cache, must-revalidate, private')
    setResponseHeader(event, 'Pragma', 'no-cache')
    setResponseHeader(event, 'Expires', '0')
  }
})
