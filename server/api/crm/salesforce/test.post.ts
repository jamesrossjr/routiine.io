import { requireAuth } from '~~/server/utils/auth'
import { db, schema } from '~~/server/database'
import { eq, and } from 'drizzle-orm'

/**
 * Test Salesforce connection
 * Verifies that the Salesforce connection is working
 * POST /api/crm/salesforce/test
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

    const settings = connection.settings as any
    const instanceUrl = settings?.instanceUrl

    if (!instanceUrl || !connection.connectionToken) {
      throw createError({
        statusCode: 400,
        message: 'Invalid Salesforce connection configuration',
      })
    }

    // Test connection by querying Salesforce API
    const testUrl = `${instanceUrl}/services/data/v58.0/limits`

    const response = await fetch(testUrl, {
      headers: {
        Authorization: `Bearer ${connection.connectionToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      // If unauthorized, connection may have expired
      if (response.status === 401) {
        // Update connection status
        await db
          .update(schema.crmConnections)
          .set({
            connectionStatus: 'error',
          })
          .where(eq(schema.crmConnections.id, connection.id))

        throw createError({
          statusCode: 401,
          message: 'Salesforce connection expired. Please reconnect.',
        })
      }

      throw createError({
        statusCode: response.status,
        message: 'Failed to connect to Salesforce API',
      })
    }

    const limitsData = await response.json()

    // Update connection status to connected
    await db
      .update(schema.crmConnections)
      .set({
        connectionStatus: 'connected',
      })
      .where(eq(schema.crmConnections.id, connection.id))

    console.log(`Salesforce connection test successful for user ${user.userId}`)

    return {
      success: true,
      message: 'Salesforce connection is working',
      data: {
        organization: connection.connectedOrgName,
        userName: connection.connectedUserName,
        instanceUrl,
        apiVersion: 'v58.0',
        limits: {
          dailyApiRequests: limitsData.DailyApiRequests,
          dataStorage: limitsData.DataStorageMB,
        },
      },
    }
  } catch (error: any) {
    console.error('Salesforce test error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while testing Salesforce connection',
    })
  }
})
