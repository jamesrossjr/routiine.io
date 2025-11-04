import { eq, and } from 'drizzle-orm'
import { requireAuth } from '~~/server/utils/auth'
import { db, schema } from '~~/server/database'

/**
 * Get specific CRM connection
 * Returns details for a specific CRM connection
 * GET /api/crm/connections/:id
 */
export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    const user = requireAuth(event)

    // Get connection ID from route params
    const connectionId = getRouterParam(event, 'id')

    if (!connectionId) {
      throw createError({
        statusCode: 400,
        message: 'Connection ID is required'
      })
    }

    // Get connection
    const [connection] = await db
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
      .where(
        and(
          eq(schema.crmConnections.id, connectionId),
          eq(schema.crmConnections.userId, user.userId)
        )
      )
      .limit(1)

    if (!connection) {
      throw createError({
        statusCode: 404,
        message: 'CRM connection not found'
      })
    }

    return {
      success: true,
      connection
    }
  } catch (error: unknown) {
    console.error('Get CRM connection error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while fetching CRM connection'
    })
  }
})
