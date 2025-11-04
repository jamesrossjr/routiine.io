import { eq, and } from 'drizzle-orm'
import { db, schema } from '~~/server/database'
import { requireAuth } from '~~/server/utils/auth'

/**
 * Get a specific signal by ID
 * GET /api/signals/:id
 */
export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    const user = requireAuth(event)

    // Get signal ID from route params
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Signal ID is required'
      })
    }

    // Fetch signal (ensure it belongs to the user)
    const signal = await db.query.signals.findFirst({
      where: and(
        eq(schema.signals.id, id),
        eq(schema.signals.userId, user.userId)
      ),
      with: {
        client: {
          columns: {
            id: true,
            name: true,
            company: true,
            email: true
          }
        },
        opportunity: {
          columns: {
            id: true,
            title: true,
            value: true,
            stage: true
          }
        }
      }
    })

    if (!signal) {
      throw createError({
        statusCode: 404,
        message: 'Signal not found'
      })
    }

    return {
      success: true,
      signal
    }
  } catch (error: any) {
    console.error('Get signal error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while fetching signal'
    })
  }
})
