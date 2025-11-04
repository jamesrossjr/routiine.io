import { eq, desc } from 'drizzle-orm'
import { requireAuth } from '~~/server/utils/auth'
import { db, schema } from '~~/server/database'

/**
 * List CRM connections
 * Returns all CRM connections for the authenticated user
 * GET /api/crm/connections
 */
export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    const user = requireAuth(event)

    // Get all CRM connections for the user
    const connections = await db
      .select({
        id: schema.crmConnections.id,
        platform: schema.crmConnections.platform,
        connectionStatus: schema.crmConnections.connectionStatus,
        connectedUserName: schema.crmConnections.connectedUserName,
        connectedOrgName: schema.crmConnections.connectedOrgName,
        lastSyncAt: schema.crmConnections.lastSyncAt,
        settings: schema.crmConnections.settings,
        createdAt: schema.crmConnections.createdAt
      })
      .from(schema.crmConnections)
      .where(eq(schema.crmConnections.userId, user.userId))
      .orderBy(desc(schema.crmConnections.createdAt))

    return {
      success: true,
      connections,
      count: connections.length
    }
  } catch (error: any) {
    console.error('List CRM connections error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while fetching CRM connections'
    })
  }
})
