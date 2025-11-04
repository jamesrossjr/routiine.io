import { and, eq, desc, gte, lte, sql, inArray } from 'drizzle-orm'
import { db, schema } from '~~/server/database'

/**
 * Common query patterns optimized for performance
 */

/**
 * Get user's signals with pagination and optional filters
 */
export async function getUserSignals(
  userId: string,
  options: {
    limit?: number
    offset?: number
    type?: 'positive' | 'negative'
    category?: string
    priority?: 'high' | 'medium' | 'low'
    startDate?: Date
    endDate?: Date
  } = {}
) {
  const {
    limit = 20,
    offset = 0,
    type,
    category,
    priority,
    startDate,
    endDate
  } = options

  const conditions = [eq(schema.signals.userId, userId)]

  if (type) {
    conditions.push(eq(schema.signals.type, type))
  }
  if (category) {
    conditions.push(eq(schema.signals.category, category as any))
  }
  if (priority) {
    conditions.push(eq(schema.signals.priority, priority))
  }
  if (startDate) {
    conditions.push(gte(schema.signals.timestamp, startDate))
  }
  if (endDate) {
    conditions.push(lte(schema.signals.timestamp, endDate))
  }

  const signals = await db.query.signals.findMany({
    where: and(...conditions),
    orderBy: [desc(schema.signals.timestamp)],
    limit,
    offset,
    with: {
      client: {
        columns: {
          id: true,
          name: true,
          company: true
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

  // Get total count for pagination
  const [{ count }] = await db
    .select({ count: sql<number>`cast(count(*) as integer)` })
    .from(schema.signals)
    .where(and(...conditions))

  return {
    signals,
    total: count,
    hasMore: offset + signals.length < count
  }
}

/**
 * Get user's activities with pagination
 */
export async function getUserActivities(
  userId: string,
  options: {
    limit?: number
    offset?: number
    clientId?: string
    activityType?: string
    startDate?: Date
    endDate?: Date
  } = {}
) {
  const {
    limit = 20,
    offset = 0,
    clientId,
    activityType,
    startDate,
    endDate
  } = options

  const conditions = [eq(schema.activities.userId, userId)]

  if (clientId) {
    conditions.push(eq(schema.activities.clientId, clientId))
  }
  if (activityType) {
    conditions.push(eq(schema.activities.activityType, activityType as any))
  }
  if (startDate) {
    conditions.push(gte(schema.activities.timestamp, startDate))
  }
  if (endDate) {
    conditions.push(lte(schema.activities.timestamp, endDate))
  }

  const activities = await db.query.activities.findMany({
    where: and(...conditions),
    orderBy: [desc(schema.activities.timestamp)],
    limit,
    offset,
    with: {
      client: {
        columns: {
          id: true,
          name: true,
          company: true
        }
      }
    }
  })

  const [{ count }] = await db
    .select({ count: sql<number>`cast(count(*) as integer)` })
    .from(schema.activities)
    .where(and(...conditions))

  return {
    activities,
    total: count,
    hasMore: offset + activities.length < count
  }
}

/**
 * Get user's opportunities grouped by stage
 */
export async function getUserOpportunitiesByStage(userId: string) {
  const opportunities = await db.query.opportunities.findMany({
    where: eq(schema.opportunities.userId, userId),
    orderBy: [desc(schema.opportunities.value)],
    with: {
      client: {
        columns: {
          id: true,
          name: true,
          company: true
        }
      }
    }
  })

  // Group by stage
  const grouped = opportunities.reduce(
    (acc, opp) => {
      if (!acc[opp.stage]) {
        acc[opp.stage] = []
      }
      acc[opp.stage].push(opp)
      return acc
    },
    {} as Record<string, typeof opportunities>
  )

  return grouped
}

/**
 * Get user's tasks by status
 */
export async function getUserTasks(
  userId: string,
  options: {
    status?: 'pending' | 'in_progress' | 'completed'
    limit?: number
    offset?: number
  } = {}
) {
  const { status, limit = 50, offset = 0 } = options

  const conditions = [eq(schema.tasks.userId, userId)]

  if (status) {
    conditions.push(eq(schema.tasks.status, status))
  }

  const tasks = await db.query.tasks.findMany({
    where: and(...conditions),
    orderBy: [desc(schema.tasks.dueDate)],
    limit,
    offset,
    with: {
      relatedClient: {
        columns: {
          id: true,
          name: true,
          company: true
        }
      }
    }
  })

  return tasks
}

/**
 * Get latest momentum score for user
 */
export async function getLatestMomentumScore(userId: string) {
  return await db.query.momentumScores.findFirst({
    where: eq(schema.momentumScores.userId, userId),
    orderBy: [desc(schema.momentumScores.calculatedAt)]
  })
}

/**
 * Get momentum score history for user
 */
export async function getMomentumScoreHistory(
  userId: string,
  options: {
    startDate?: Date
    endDate?: Date
    limit?: number
  } = {}
) {
  const { startDate, endDate, limit = 90 } = options

  const conditions = [eq(schema.momentumScores.userId, userId)]

  if (startDate) {
    conditions.push(gte(schema.momentumScores.calculatedAt, startDate))
  }
  if (endDate) {
    conditions.push(lte(schema.momentumScores.calculatedAt, endDate))
  }

  return await db.query.momentumScores.findMany({
    where: and(...conditions),
    orderBy: [desc(schema.momentumScores.calculatedAt)],
    limit
  })
}

/**
 * Get user's signal assessments
 */
export async function getUserSignalAssessments(
  userId: string,
  options: {
    clientId?: string
    isDraft?: boolean
    limit?: number
    offset?: number
  } = {}
) {
  const { clientId, isDraft, limit = 20, offset = 0 } = options

  const conditions = [eq(schema.signalAssessments.userId, userId)]

  if (clientId) {
    conditions.push(eq(schema.signalAssessments.clientId, clientId))
  }
  if (isDraft !== undefined) {
    conditions.push(eq(schema.signalAssessments.isDraft, isDraft))
  }

  return await db.query.signalAssessments.findMany({
    where: and(...conditions),
    orderBy: [desc(schema.signalAssessments.assessmentDate)],
    limit,
    offset,
    with: {
      client: {
        columns: {
          id: true,
          name: true,
          company: true
        }
      }
    }
  })
}

/**
 * Get dashboard statistics for user
 */
export async function getDashboardStats(userId: string) {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  // Get signal count (last 7 days)
  const [{ signalCount }] = await db
    .select({ signalCount: sql<number>`cast(count(*) as integer)` })
    .from(schema.signals)
    .where(
      and(
        eq(schema.signals.userId, userId),
        gte(schema.signals.timestamp, sevenDaysAgo)
      )
    )

  // Get activity count (last 7 days)
  const [{ activityCount }] = await db
    .select({ activityCount: sql<number>`cast(count(*) as integer)` })
    .from(schema.activities)
    .where(
      and(
        eq(schema.activities.userId, userId),
        gte(schema.activities.timestamp, sevenDaysAgo)
      )
    )

  // Get open opportunities count and total value
  const openOpps = await db.query.opportunities.findMany({
    where: and(
      eq(schema.opportunities.userId, userId),
      inArray(schema.opportunities.stage, ['discovery', 'proposal', 'negotiation'])
    ),
    columns: {
      value: true
    }
  })

  const pipelineValue = openOpps.reduce((sum, opp) => {
    return sum + (opp.value ? parseFloat(opp.value.toString()) : 0)
  }, 0)

  // Get pending tasks count
  const [{ pendingTasks }] = await db
    .select({ pendingTasks: sql<number>`cast(count(*) as integer)` })
    .from(schema.tasks)
    .where(
      and(
        eq(schema.tasks.userId, userId),
        inArray(schema.tasks.status, ['pending', 'in_progress'])
      )
    )

  // Get latest momentum score
  const momentumScore = await getLatestMomentumScore(userId)

  // Calculate conversion rate (last 30 days)
  const allOpps = await db.query.opportunities.findMany({
    where: and(
      eq(schema.opportunities.userId, userId),
      gte(schema.opportunities.createdAt, thirtyDaysAgo)
    ),
    columns: {
      stage: true
    }
  })

  const closedWon = allOpps.filter(o => o.stage === 'closed_won').length
  const total = allOpps.length
  const conversionRate = total > 0 ? ((closedWon / total) * 100).toFixed(1) : '0'

  return {
    activeSignals: signalCount,
    weeklyActivities: activityCount,
    pipelineValue: pipelineValue.toFixed(2),
    openOpportunities: openOpps.length,
    pendingTasks,
    conversionRate: `${conversionRate}%`,
    momentumScore: momentumScore?.score || 0,
    momentumTrend: {
      activity: momentumScore?.activityTrend || 0,
      conversion: momentumScore?.conversionTrend || 0
    }
  }
}

/**
 * Search across clients
 */
export async function searchClients(userId: string, query: string, limit: number = 10) {
  // Use pg_trgm similarity search for fuzzy matching
  return await db.query.clients.findMany({
    where: and(
      eq(schema.clients.userId, userId),
      sql`(
        ${schema.clients.name} ILIKE ${`%${query}%`} OR
        ${schema.clients.company} ILIKE ${`%${query}%`} OR
        ${schema.clients.email} ILIKE ${`%${query}%`}
      )`
    ),
    limit
  })
}
