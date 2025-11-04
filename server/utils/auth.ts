import jwt from 'jsonwebtoken'
import type { H3Event } from 'h3'

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'development-secret-change-in-production'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'development-refresh-secret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m'
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d'

export interface JWTPayload {
  userId: string
  email: string
  role: string
}

// Password hashing utilities
// Note: Using simple crypto.scrypt for now since argon2 requires native compilation
import { scrypt, randomBytes, timingSafeEqual } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

/**
 * Hash a password using scrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex')
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer
  return `${salt}:${derivedKey.toString('hex')}`
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [salt, key] = hash.split(':')
  const keyBuffer = Buffer.from(key, 'hex')
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer
  return timingSafeEqual(keyBuffer, derivedKey)
}

/**
 * Generate access token (short-lived)
 */
export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })
}

/**
 * Generate refresh token (long-lived)
 */
export function generateRefreshToken(payload: JWTPayload, rememberMe: boolean = false): string {
  const expiresIn = rememberMe ? '30d' : JWT_REFRESH_EXPIRES_IN
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn,
  })
}

/**
 * Verify access token
 */
export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

/**
 * Set authentication cookies
 */
export function setAuthCookies(event: H3Event, accessToken: string, refreshToken: string) {
  // Set access token cookie (httpOnly, secure in production)
  setCookie(event, 'accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60, // 15 minutes
    path: '/',
  })

  // Set refresh token cookie (httpOnly, secure in production)
  setCookie(event, 'refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  })
}

/**
 * Clear authentication cookies
 */
export function clearAuthCookies(event: H3Event) {
  deleteCookie(event, 'accessToken')
  deleteCookie(event, 'refreshToken')
}

/**
 * Get user from request (middleware helper)
 */
export function getUserFromEvent(event: H3Event): JWTPayload | null {
  const accessToken = getCookie(event, 'accessToken')
  if (!accessToken) {
    return null
  }
  return verifyAccessToken(accessToken)
}

/**
 * Require authentication middleware
 */
export function requireAuth(event: H3Event): JWTPayload {
  const user = getUserFromEvent(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized - Please log in',
    })
  }
  return user
}

/**
 * Require specific role middleware
 */
export function requireRole(event: H3Event, allowedRoles: string[]): JWTPayload {
  const user = requireAuth(event)
  if (!allowedRoles.includes(user.role)) {
    throw createError({
      statusCode: 403,
      message: 'Forbidden - Insufficient permissions',
    })
  }
  return user
}

/**
 * Generate a random token for password reset, etc.
 */
export function generateRandomToken(length: number = 32): string {
  return randomBytes(length).toString('hex')
}
