import { randomBytes, timingSafeEqual } from 'crypto'

/**
 * CSRF Protection Middleware
 * Protects against Cross-Site Request Forgery attacks
 */

const CSRF_TOKEN_LENGTH = 32
const CSRF_COOKIE_NAME = 'csrf_token'
const CSRF_HEADER_NAME = 'x-csrf-token'

/**
 * Generate a secure CSRF token
 */
function generateCSRFToken(): string {
  return randomBytes(CSRF_TOKEN_LENGTH).toString('hex')
}

/**
 * Verify CSRF token matches
 */
function verifyCSRFToken(token1: string, token2: string): boolean {
  if (!token1 || !token2) return false
  if (token1.length !== token2.length) return false

  const buffer1 = Buffer.from(token1)
  const buffer2 = Buffer.from(token2)

  return timingSafeEqual(buffer1, buffer2)
}

/**
 * CSRF Protection Middleware
 * - GET requests: Generate and set CSRF token
 * - POST/PUT/DELETE/PATCH: Verify CSRF token
 */
export default defineEventHandler(async (event) => {
  const method = event.method

  // Skip CSRF for safe methods (GET, HEAD, OPTIONS)
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
    // Generate CSRF token if it doesn't exist
    let csrfToken = getCookie(event, CSRF_COOKIE_NAME)

    if (!csrfToken) {
      csrfToken = generateCSRFToken()

      setCookie(event, CSRF_COOKIE_NAME, csrfToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      })
    }

    // Set token in response header for client to read
    setResponseHeader(event, CSRF_HEADER_NAME, csrfToken)
    return
  }

  // Skip CSRF check for:
  // - Public endpoints (OAuth callbacks, webhooks)
  // - API routes with different auth (if needed)
  const path = event.path || ''
  const skipPaths = [
    '/api/auth/oauth',
    '/api/webhooks',
  ]

  if (skipPaths.some((p) => path.includes(p))) {
    return
  }

  // For state-changing methods, verify CSRF token
  const tokenFromCookie = getCookie(event, CSRF_COOKIE_NAME)
  const tokenFromHeader = getRequestHeader(event, CSRF_HEADER_NAME)

  if (!tokenFromCookie || !tokenFromHeader) {
    throw createError({
      statusCode: 403,
      message: 'CSRF token missing',
    })
  }

  if (!verifyCSRFToken(tokenFromCookie, tokenFromHeader)) {
    throw createError({
      statusCode: 403,
      message: 'Invalid CSRF token',
    })
  }
})
