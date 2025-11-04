import { db, schema } from '~~/server/database'
import { eq, and, gte, desc } from 'drizzle-orm'

/**
 * Momentum Score Calculation Algorithm
 * Calculates a user's sales momentum score (0-100) based on:
 * - Activity Score: Recent signals and activities
 * - Conversion Score: Opportunity progression and win rate
 * - Consistency Score: Regular engagement patterns
 */

interface MomentumScoreResult {
  score: number // 0-100
  activityScore: number
  conversionScore: number
  consistencyScore: number
  activityTrend: number // Percentage change
  conversionTrend: number // Percentage change
  signalCount: number
}

interface SignalImpact {
  timestamp: Date
  impact: number
  category: string
}

/**
 * Calculate momentum score for a user
 */
export async function calculateMomentumScore(userId: string): Promise<MomentumScoreResult> {
  // Define time periods
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  // Get signals for the last 30 days (current period)
  const currentSignals = await db
    .select()
    .from(schema.signals)
    .where(and(eq(schema.signals.userId, userId), gte(schema.signals.timestamp, thirtyDaysAgo)))
    .orderBy(desc(schema.signals.timestamp))

  // Get signals for 30-60 days ago (previous period for trend comparison)
  const previousSignals = await db
    .select()
    .from(schema.signals)
    .where(
      and(
        eq(schema.signals.userId, userId),
        gte(schema.signals.timestamp, sixtyDaysAgo),
        gte(schema.signals.timestamp, thirtyDaysAgo)
      )
    )

  // Get activities for the last 30 days
  const currentActivities = await db
    .select()
    .from(schema.activities)
    .where(and(eq(schema.activities.userId, userId), gte(schema.activities.timestamp, thirtyDaysAgo)))

  // Get opportunities for conversion calculations
  const allOpportunities = await db
    .select()
    .from(schema.opportunities)
    .where(eq(schema.opportunities.userId, userId))

  // Calculate activity score (0-35 points)
  const activityScore = calculateActivityScore(currentSignals, currentActivities, sevenDaysAgo)

  // Calculate conversion score (0-35 points)
  const conversionScore = calculateConversionScore(allOpportunities)

  // Calculate consistency score (0-30 points)
  const consistencyScore = calculateConsistencyScore(currentSignals, sevenDaysAgo)

  // Calculate trends (percentage change from previous period)
  const activityTrend = calculateActivityTrend(currentSignals, previousSignals)
  const conversionTrend = calculateConversionTrend(allOpportunities, thirtyDaysAgo, sixtyDaysAgo)

  // Calculate final momentum score (0-100)
  const score = Math.min(100, activityScore + conversionScore + consistencyScore)

  return {
    score,
    activityScore,
    conversionScore,
    consistencyScore,
    activityTrend,
    conversionTrend,
    signalCount: currentSignals.length,
  }
}

/**
 * Calculate activity score based on signals and activities
 * Score: 0-35 points
 */
function calculateActivityScore(
  signals: any[],
  activities: any[],
  sevenDaysAgo: Date
): number {
  // Calculate signal impact (max 25 points)
  const totalSignalImpact = signals.reduce((sum, signal) => sum + signal.impact, 0)
  const signalScore = Math.min(25, totalSignalImpact)

  // Calculate recent activity bonus (max 10 points)
  const recentSignals = signals.filter((s) => new Date(s.timestamp) >= sevenDaysAgo)
  const recentActivities = activities.filter((a) => new Date(a.timestamp) >= sevenDaysAgo)
  const recentActivityCount = recentSignals.length + recentActivities.length
  const activityBonus = Math.min(10, recentActivityCount)

  return Math.round(signalScore + activityBonus)
}

/**
 * Calculate conversion score based on opportunities
 * Score: 0-35 points
 */
function calculateConversionScore(opportunities: any[]): number {
  if (opportunities.length === 0) {
    return 0
  }

  // Calculate win rate (max 20 points)
  const closedOpportunities = opportunities.filter(
    (opp) => opp.stage === 'closed_won' || opp.stage === 'closed_lost'
  )
  const wonOpportunities = opportunities.filter((opp) => opp.stage === 'closed_won')
  const winRate = closedOpportunities.length > 0 ? wonOpportunities.length / closedOpportunities.length : 0
  const winRateScore = Math.round(winRate * 20)

  // Calculate pipeline health (max 15 points)
  const activeOpportunities = opportunities.filter(
    (opp) => opp.stage !== 'closed_won' && opp.stage !== 'closed_lost'
  )

  // Points based on stage distribution
  const discoveryCount = activeOpportunities.filter((opp) => opp.stage === 'discovery').length
  const proposalCount = activeOpportunities.filter((opp) => opp.stage === 'proposal').length
  const negotiationCount = activeOpportunities.filter((opp) => opp.stage === 'negotiation').length

  // Better score if opportunities are progressing through stages
  const pipelineHealthScore = Math.min(
    15,
    discoveryCount * 1 + proposalCount * 2 + negotiationCount * 3
  )

  return Math.round(winRateScore + pipelineHealthScore)
}

/**
 * Calculate consistency score based on regular engagement
 * Score: 0-30 points
 */
function calculateConsistencyScore(signals: any[], sevenDaysAgo: Date): number {
  if (signals.length === 0) {
    return 0
  }

  // Group signals by day
  const signalsByDay = new Map<string, number>()

  signals.forEach((signal) => {
    const date = new Date(signal.timestamp).toISOString().split('T')[0]
    signalsByDay.set(date, (signalsByDay.get(date) || 0) + 1)
  })

  // Calculate consistency metrics
  const daysWithActivity = signalsByDay.size
  const avgSignalsPerDay = signals.length / 30 // Over 30 days

  // Points for number of active days (max 15 points)
  const activeDaysScore = Math.min(15, daysWithActivity)

  // Points for average signals per day (max 15 points)
  const avgSignalsScore = Math.min(15, Math.round(avgSignalsPerDay * 2))

  // Bonus for recent activity (last 7 days)
  const recentSignals = signals.filter((s) => new Date(s.timestamp) >= sevenDaysAgo)
  const recentBonus = recentSignals.length > 0 ? 5 : 0

  return Math.round(Math.min(30, activeDaysScore + avgSignalsScore + recentBonus))
}

/**
 * Calculate activity trend (percentage change from previous period)
 */
function calculateActivityTrend(currentSignals: any[], previousSignals: any[]): number {
  const currentImpact = currentSignals.reduce((sum, s) => sum + s.impact, 0)
  const previousImpact = previousSignals.reduce((sum, s) => sum + s.impact, 0)

  if (previousImpact === 0) {
    return currentImpact > 0 ? 100 : 0
  }

  const percentChange = ((currentImpact - previousImpact) / previousImpact) * 100
  return Math.round(percentChange)
}

/**
 * Calculate conversion trend (win rate change)
 */
function calculateConversionTrend(
  opportunities: any[],
  thirtyDaysAgo: Date,
  sixtyDaysAgo: Date
): number {
  // Current period win rate (last 30 days)
  const currentClosed = opportunities.filter(
    (opp) =>
      opp.closedAt &&
      new Date(opp.closedAt) >= thirtyDaysAgo &&
      (opp.stage === 'closed_won' || opp.stage === 'closed_lost')
  )
  const currentWon = currentClosed.filter((opp) => opp.stage === 'closed_won')
  const currentWinRate = currentClosed.length > 0 ? currentWon.length / currentClosed.length : 0

  // Previous period win rate (30-60 days ago)
  const previousClosed = opportunities.filter(
    (opp) =>
      opp.closedAt &&
      new Date(opp.closedAt) >= sixtyDaysAgo &&
      new Date(opp.closedAt) < thirtyDaysAgo &&
      (opp.stage === 'closed_won' || opp.stage === 'closed_lost')
  )
  const previousWon = previousClosed.filter((opp) => opp.stage === 'closed_won')
  const previousWinRate = previousClosed.length > 0 ? previousWon.length / previousClosed.length : 0

  if (previousWinRate === 0) {
    return currentWinRate > 0 ? 100 : 0
  }

  const percentChange = ((currentWinRate - previousWinRate) / previousWinRate) * 100
  return Math.round(percentChange)
}

/**
 * Store momentum score in database
 */
export async function storeMomentumScore(userId: string, scoreData: MomentumScoreResult) {
  await db.insert(schema.momentumScores).values({
    userId,
    score: scoreData.score,
    activityScore: scoreData.activityScore,
    conversionScore: scoreData.conversionScore,
    consistencyScore: scoreData.consistencyScore,
    activityTrend: scoreData.activityTrend,
    conversionTrend: scoreData.conversionTrend,
    signalCount: scoreData.signalCount,
  })
}

/**
 * Get latest momentum score for a user
 */
export async function getLatestMomentumScore(userId: string): Promise<MomentumScoreResult | null> {
  const [latestScore] = await db
    .select()
    .from(schema.momentumScores)
    .where(eq(schema.momentumScores.userId, userId))
    .orderBy(desc(schema.momentumScores.calculatedAt))
    .limit(1)

  if (!latestScore) {
    return null
  }

  return {
    score: latestScore.score,
    activityScore: latestScore.activityScore || 0,
    conversionScore: latestScore.conversionScore || 0,
    consistencyScore: latestScore.consistencyScore || 0,
    activityTrend: latestScore.activityTrend || 0,
    conversionTrend: latestScore.conversionTrend || 0,
    signalCount: latestScore.signalCount || 0,
  }
}
