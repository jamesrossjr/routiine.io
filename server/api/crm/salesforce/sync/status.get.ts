import { requireAuth } from '~~/server/utils/auth'
import { db, schema } from '~~/server/database'
import { eq, and } from 'drizzle-orm'

/**
 * Get Salesforce sync status
 * Returns information about the last sync and connection status
 * GET /api/crm/salesforce/sync/status
 */
export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    const user = requireAuth(event)

    // Get Salesforce connection
    const [connection] = await db
      .select()
      .from(schema.crmConnections)
      .where(
        and(
          eq(schema.crmConnections.userId, user.userId),
          eq(schema.crmConnections.platform, 'salesforce')
        )
      )
      .limit(1)

    if (!connection) {
      throw createError({
        statusCode: 404,
        message: 'Salesforce connection not found',
      })
    }

    // Get sync statistics
    const [clientCount] = await db
      .select({
        count: schema.clients.id,
      })
      .from(schema.clients)
      .where(
        and(
          eq(schema.clients.userId, user.userId),
          eq(schema.clients.source, 'crm')
        )
      )

    const [opportunityCount] = await db
      .select({
        count: schema.opportunities.id,
      })
      .from(schema.opportunities)
      .where(eq(schema.opportunities.userId, user.userId))

    const [activityCount] = await db
      .select({
        count: schema.activities.id,
      })
      .from(schema.activities)
      .where(eq(schema.activities.userId, user.userId))

    // Calculate time since last sync
    let timeSinceSync = null
    if (connection.lastSyncAt) {
      const now = new Date()
      const lastSync = new Date(connection.lastSyncAt)
      const diffMs = now.getTime() - lastSync.getTime()
      const diffMinutes = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMinutes / 60)
      const diffDays = Math.floor(diffHours / 24)

      if (diffDays > 0) {
        timeSinceSync = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
      } else if (diffHours > 0) {
        timeSinceSync = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
      } else if (diffMinutes > 0) {
        timeSinceSync = `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
      } else {
        timeSinceSync = 'Just now'
      }
    }

    return {
      success: true,
      status: {
        connected: connection.connectionStatus === 'connected',
        connectionStatus: connection.connectionStatus,
        organization: connection.connectedOrgName,
        userName: connection.connectedUserName,
        lastSyncAt: connection.lastSyncAt,
        timeSinceSync,
        syncedData: {
          clients: 0, // This would need a proper count query
          opportunities: 0,
          activities: 0,
        },
      },
    }
  } catch (error: any) {
    console.error('Get sync status error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while fetching sync status',
    })
  }
})
