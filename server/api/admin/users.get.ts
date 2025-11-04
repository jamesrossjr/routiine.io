import { db } from '~~/server/database'
import { requireRole } from '~~/server/utils/auth'

/**
 * Admin-only endpoint to list all users
 * Requires 'admin' role
 */
export default defineEventHandler(async (event) => {
  try {
    // Require admin role
    requireRole(event, ['admin'])

    // Fetch all users (exclude passwords)
    const users = await db.query.users.findMany({
      columns: {
        password: false
      },
      orderBy: (users, { desc }) => [desc(users.createdAt)],
      limit: 100
    })

    return {
      success: true,
      users,
      total: users.length
    }
  } catch (error: unknown) {
    console.error('Admin users list error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while fetching users'
    })
  }
})
