import { eq } from 'drizzle-orm'
import { db, schema } from '~~/server/database'
import { clearAuthCookies } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    // Get refresh token from cookie
    const refreshToken = getCookie(event, 'refreshToken')

    if (refreshToken) {
      // Delete refresh token from database
      await db.delete(schema.sessions).where(eq(schema.sessions.refreshToken, refreshToken))
    }

    // Clear authentication cookies
    clearAuthCookies(event)

    return {
      success: true,
      message: 'Logged out successfully'
    }
  } catch (error: unknown) {
    console.error('Logout error:', error)

    throw createError({
      statusCode: 500,
      message: 'An error occurred during logout'
    })
  }
})
