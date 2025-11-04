import { eq } from 'drizzle-orm'
import { db, schema } from '~~/server/database'
import { verifyRefreshToken, generateAccessToken, setAuthCookies } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    // Get refresh token from cookie
    const refreshToken = getCookie(event, 'refreshToken')

    if (!refreshToken) {
      throw createError({
        statusCode: 401,
        message: 'No refresh token provided',
      })
    }

    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken)

    if (!payload) {
      throw createError({
        statusCode: 401,
        message: 'Invalid or expired refresh token',
      })
    }

    // Check if refresh token exists in database
    const session = await db.query.sessions.findFirst({
      where: eq(schema.sessions.refreshToken, refreshToken),
    })

    if (!session) {
      throw createError({
        statusCode: 401,
        message: 'Session not found',
      })
    }

    // Check if session has expired
    if (new Date() > new Date(session.expiresAt)) {
      // Delete expired session
      await db.delete(schema.sessions).where(eq(schema.sessions.id, session.id))

      throw createError({
        statusCode: 401,
        message: 'Session expired',
      })
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(payload)

    // Optionally rotate refresh token (for better security)
    const newRefreshToken = refreshToken // Keep same for now

    // Update cookies
    setAuthCookies(event, newAccessToken, newRefreshToken)

    return {
      success: true,
      message: 'Token refreshed successfully',
    }
  } catch (error: any) {
    console.error('Token refresh error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while refreshing token',
    })
  }
})
