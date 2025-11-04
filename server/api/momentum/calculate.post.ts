import { requireAuth } from '~~/server/utils/auth'
import { calculateMomentumScore, storeMomentumScore } from '~~/server/utils/momentum'

/**
 * Calculate and store momentum score
 * Calculates the user's current momentum score and stores it
 * POST /api/momentum/calculate
 */
export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    const user = requireAuth(event)

    // Calculate momentum score
    const scoreData = await calculateMomentumScore(user.userId)

    // Store the score in database
    await storeMomentumScore(user.userId, scoreData)

    console.log(`Momentum score calculated for user ${user.userId}: ${scoreData.score}`)

    return {
      success: true,
      message: 'Momentum score calculated successfully',
      score: scoreData
    }
  } catch (error: any) {
    console.error('Calculate momentum score error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while calculating momentum score'
    })
  }
})
