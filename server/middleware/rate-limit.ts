/**
 * Rate Limiting Middleware
 * Prevents brute force and DOS attacks by limiting requests per IP
 */

interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Max requests per window
  skipSuccessfulRequests?: boolean // Don't count successful requests
}

// In-memory store for rate limiting
// In production, use Redis for distributed rate limiting
const requestStore = new Map<string, { count: number, resetTime: number }>()

// Cleanup expired entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of requestStore.entries()) {
    if (value.resetTime < now) {
      requestStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

/**
 * Create a rate limiter middleware
 */
export function createRateLimiter(config: RateLimitConfig) {
  const { windowMs, maxRequests, skipSuccessfulRequests = false } = config

  return defineEventHandler(async (event) => {
    // Get client identifier (IP address)
    const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'

    // Create unique key for this IP and route
    const route = event.path || ''
    const key = `${ip}:${route}`

    // Get current request count
    const now = Date.now()
    let record = requestStore.get(key)

    // Reset if window has expired
    if (!record || record.resetTime < now) {
      record = {
        count: 0,
        resetTime: now + windowMs
      }
      requestStore.set(key, record)
    }

    // Increment request count
    record.count++

    // Check if limit exceeded
    if (record.count > maxRequests) {
      // Calculate retry after time
      const retryAfter = Math.ceil((record.resetTime - now) / 1000)

      setResponseHeader(event, 'Retry-After', String(retryAfter))
      setResponseHeader(event, 'X-RateLimit-Limit', String(maxRequests))
      setResponseHeader(event, 'X-RateLimit-Remaining', '0')
      setResponseHeader(event, 'X-RateLimit-Reset', String(record.resetTime))

      throw createError({
        statusCode: 429,
        message: 'Too many requests. Please try again later.'
      })
    }

    // Set rate limit headers
    setResponseHeader(event, 'X-RateLimit-Limit', String(maxRequests))
    setResponseHeader(event, 'X-RateLimit-Remaining', String(maxRequests - record.count))
    setResponseHeader(event, 'X-RateLimit-Reset', String(record.resetTime))
  })
}

/**
 * Strict rate limiter for auth endpoints (prevent brute force)
 */
export const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5 // 5 requests per 15 minutes
})

/**
 * General API rate limiter
 */
export const apiRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100 // 100 requests per 15 minutes
})

/**
 * Strict rate limiter for sensitive operations
 */
export const strictRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 3 // 3 requests per hour
})
