import { requireAuth } from '~~/server/utils/auth'
import { db, schema } from '~~/server/database'
import { eq, and } from 'drizzle-orm'

/**
 * Disconnect CRM
 * Removes CRM connection and stops syncing
 * DELETE /api/crm/connections/:id
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
        message: 'Connection ID is required',
      })
    }

    // Verify connection exists and belongs to user
    const [connection] = await db
      .select()
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
        message: 'CRM connection not found',
      })
    }

    // Delete connection
    await db
      .delete(schema.crmConnections)
      .where(eq(schema.crmConnections.id, connectionId))

    console.log(`CRM connection disconnected: ${connection.platform} for user ${user.userId}`)

    // TODO: In production, revoke OAuth tokens with the CRM provider
    // if (connection.platform === 'salesforce') {
    //   await revokeSalesforceToken(connection.connectionToken)
    // }

    return {
      success: true,
      message: 'CRM connection removed successfully',
    }
  } catch (error: any) {
    console.error('Disconnect CRM error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while disconnecting CRM',
    })
  }
})
