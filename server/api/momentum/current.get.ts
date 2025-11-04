import { requireAuth } from '~~/server/utils/auth'
import { getLatestMomentumScore, calculateMomentumScore, storeMomentumScore } from '~~/server/utils/momentum'

/**
 * Get current momentum score
 * Returns the latest calculated momentum score or calculates a new one
 * GET /api/momentum/current
 */
export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    const user = requireAuth(event)

    // Get query parameter for auto-calculate
    const query = getQuery(event)
    const autoCalculate = query.autoCalculate === 'true'

    // Try to get latest score from database
    let scoreData = await getLatestMomentumScore(user.userId)

    // If no score exists or autoCalculate is requested, calculate new score
    if (!scoreData || autoCalculate) {
      console.log(`Calculating fresh momentum score for user ${user.userId}`)
      scoreData = await calculateMomentumScore(user.userId)

      // Store the new score
      await storeMomentumScore(user.userId, scoreData)
    }

    return {
      success: true,
      score: scoreData,
    }
  } catch (error: any) {
    console.error('Get current momentum score error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while fetching momentum score',
    })
  }
})
