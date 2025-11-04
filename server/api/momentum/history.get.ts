import { requireAuth } from '~~/server/utils/auth'
import { db, schema } from '~~/server/database'
import { eq, desc, gte } from 'drizzle-orm'

/**
 * Get momentum score history
 * Returns historical momentum scores for trend analysis
 * GET /api/momentum/history
 */
export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    const user = requireAuth(event)

    // Get query parameters
    const query = getQuery(event)
    const limit = parseInt(query.limit as string) || 30
    const days = parseInt(query.days as string) || 30

    // Calculate start date
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Get momentum score history
    const history = await db
      .select({
        id: schema.momentumScores.id,
        score: schema.momentumScores.score,
        activityScore: schema.momentumScores.activityScore,
        conversionScore: schema.momentumScores.conversionScore,
        consistencyScore: schema.momentumScores.consistencyScore,
        activityTrend: schema.momentumScores.activityTrend,
        conversionTrend: schema.momentumScores.conversionTrend,
        signalCount: schema.momentumScores.signalCount,
        calculatedAt: schema.momentumScores.calculatedAt,
      })
      .from(schema.momentumScores)
      .where(
        eq(schema.momentumScores.userId, user.userId)
      )
      .orderBy(desc(schema.momentumScores.calculatedAt))
      .limit(limit)

    // Calculate summary statistics
    const scores = history.map((h) => h.score)
    const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
    const maxScore = scores.length > 0 ? Math.max(...scores) : 0
    const minScore = scores.length > 0 ? Math.min(...scores) : 0

    // Get latest score for trend direction
    const latestScore = history.length > 0 ? history[0].score : 0
    const previousScore = history.length > 1 ? history[1].score : latestScore
    const trendDirection = latestScore > previousScore ? 'up' : latestScore < previousScore ? 'down' : 'stable'

    return {
      success: true,
      history,
      summary: {
        average: avgScore,
        max: maxScore,
        min: minScore,
        current: latestScore,
        trend: trendDirection,
        dataPoints: history.length,
      },
    }
  } catch (error: any) {
    console.error('Get momentum history error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while fetching momentum history',
    })
  }
})
