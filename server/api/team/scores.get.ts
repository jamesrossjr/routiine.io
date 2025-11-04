import { eq } from 'drizzle-orm'
import { db, schema } from '~~/server/database'
import { requireRole } from '~~/server/utils/auth'

/**
 * Manager-only endpoint to view team momentum scores
 * Requires 'manager' or 'admin' role
 */
export default defineEventHandler(async (event) => {
  try {
    // Require manager or admin role
    const user = requireRole(event, ['manager', 'admin'])

    // In a real app, you'd fetch team members based on manager assignment
    // For now, fetch all users' latest momentum scores (simplified)

    // Get all users (this would be filtered to manager's team in production)
    const users = await db.query.users.findMany({
      columns: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
      },
      where: eq(schema.users.role, 'sales_rep'),
    })

    // Get latest momentum score for each user
    const teamScores = await Promise.all(
      users.map(async (teamMember) => {
        const latestScore = await db.query.momentumScores.findFirst({
          where: eq(schema.momentumScores.userId, teamMember.id),
          orderBy: (scores, { desc }) => [desc(scores.calculatedAt)],
        })

        return {
          user: teamMember,
          score: latestScore || null,
        }
      }),
    )

    // Calculate team statistics
    const scores = teamScores.map((ts) => ts.score?.score || 0)
    const teamAverage = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
    const topPerformer = teamScores.reduce(
      (best, current) =>
        (current.score?.score || 0) > (best.score?.score || 0) ? current : best,
      teamScores[0],
    )

    return {
      success: true,
      teamScores: teamScores.sort(
        (a, b) => (b.score?.score || 0) - (a.score?.score || 0),
      ),
      statistics: {
        teamAverage: Math.round(teamAverage),
        totalMembers: users.length,
        topPerformer: topPerformer
          ? {
              name: topPerformer.user.name,
              score: topPerformer.score?.score || 0,
            }
          : null,
      },
    }
  } catch (error: any) {
    console.error('Team scores error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while fetching team scores',
    })
  }
})
