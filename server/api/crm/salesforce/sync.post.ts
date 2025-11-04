import { eq, and } from 'drizzle-orm'
import { requireAuth } from '~~/server/utils/auth'
import { syncSalesforceData } from '~~/server/utils/crm-sync'
import { db, schema } from '~~/server/database'

/**
 * Trigger Salesforce data sync
 * Syncs Contacts, Opportunities, and Tasks from Salesforce
 * POST /api/crm/salesforce/sync
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
        message: 'Salesforce connection not found'
      })
    }

    if (connection.connectionStatus !== 'connected') {
      throw createError({
        statusCode: 400,
        message: 'Salesforce connection is not active'
      })
    }

    console.log(`Starting Salesforce sync for user ${user.userId}`)

    // Trigger sync
    const result = await syncSalesforceData(user.userId, connection.id)

    console.log(`Salesforce sync completed:`, result)

    if (!result.success) {
      return {
        success: false,
        message: 'Sync completed with errors',
        result
      }
    }

    return {
      success: true,
      message: 'Salesforce data synced successfully',
      result
    }
  } catch (error: any) {
    console.error('Salesforce sync error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while syncing Salesforce data'
    })
  }
})
