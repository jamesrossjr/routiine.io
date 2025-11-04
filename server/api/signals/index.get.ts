import { requireAuth } from '~~/server/utils/auth'
import { getUserSignals } from '~~/server/utils/queries'

/**
 * Get user's signals with pagination and filters
 * GET /api/signals
 */
export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    const user = requireAuth(event)

    // Parse query parameters
    const query = getQuery(event)
    const limit = parseInt(query.limit as string) || 20
    const offset = parseInt(query.offset as string) || 0
    const type = query.type as 'positive' | 'negative' | undefined
    const category = query.category as string | undefined
    const priority = query.priority as 'high' | 'medium' | 'low' | undefined
    const startDate = query.startDate ? new Date(query.startDate as string) : undefined
    const endDate = query.endDate ? new Date(query.endDate as string) : undefined

    // Get signals using optimized query
    const result = await getUserSignals(user.userId, {
      limit,
      offset,
      type,
      category,
      priority,
      startDate,
      endDate
    })

    return {
      success: true,
      signals: result.signals,
      pagination: {
        total: result.total,
        limit,
        offset,
        hasMore: result.hasMore
      }
    }
  } catch (error: any) {
    console.error('Get signals error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while fetching signals'
    })
  }
})
