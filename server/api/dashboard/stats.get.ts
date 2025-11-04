import { requireAuth } from '~~/server/utils/auth'
import { getDashboardStats } from '~~/server/utils/queries'

/**
 * Get dashboard statistics
 * Returns key metrics for the dashboard home page
 * GET /api/dashboard/stats
 */
export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    const user = requireAuth(event)

    // Get dashboard stats using optimized query
    const stats = await getDashboardStats(user.userId)

    return {
      success: true,
      stats
    }
  } catch (error: unknown) {
    console.error('Dashboard stats error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while fetching dashboard stats'
    })
  }
})
