import { eq, and } from 'drizzle-orm'
import { db, schema } from '~~/server/database'

/**
 * CRM Data Sync Service
 * Handles syncing data from Salesforce to Routiine.io
 */

interface SyncResult {
  success: boolean
  clientsSynced: number
  opportunitiesSynced: number
  activitiesSynced: number
  errors: string[]
}

interface SalesforceContact {
  Id: string
  Name: string
  Email: string
  Phone?: string
  Title?: string
  AccountId?: string
  Account?: {
    Name?: string
  }
}

interface SalesforceOpportunity {
  Id: string
  Name: string
  Amount?: number
  StageName: string
  Probability?: number
  CloseDate: string
  ContactId?: string
}

interface SalesforceTask {
  Id: string
  Subject: string
  Description?: string
  Status: string
  WhoId?: string
  ActivityDate?: string
}

/**
 * Sync Salesforce data to Routiine.io
 */
export async function syncSalesforceData(
  userId: string,
  connectionId: string
): Promise<SyncResult> {
  const result: SyncResult = {
    success: true,
    clientsSynced: 0,
    opportunitiesSynced: 0,
    activitiesSynced: 0,
    errors: []
  }

  try {
    // Get Salesforce connection
    const [connection] = await db
      .select()
      .from(schema.crmConnections)
      .where(
        and(
          eq(schema.crmConnections.id, connectionId),
          eq(schema.crmConnections.userId, userId),
          eq(schema.crmConnections.platform, 'salesforce')
        )
      )
      .limit(1)

    if (!connection) {
      throw new Error('Salesforce connection not found')
    }

    const settings = connection.settings as any
    const instanceUrl = settings?.instanceUrl
    const accessToken = connection.connectionToken

    if (!instanceUrl || !accessToken) {
      throw new Error('Invalid Salesforce connection configuration')
    }

    // Sync Contacts (as Clients)
    const clientsResult = await syncSalesforceContacts(userId, instanceUrl, accessToken)
    result.clientsSynced = clientsResult.synced
    result.errors.push(...clientsResult.errors)

    // Sync Opportunities
    const opportunitiesResult = await syncSalesforceOpportunities(
      userId,
      instanceUrl,
      accessToken
    )
    result.opportunitiesSynced = opportunitiesResult.synced
    result.errors.push(...opportunitiesResult.errors)

    // Sync Tasks (as Activities)
    const activitiesResult = await syncSalesforceTasks(userId, instanceUrl, accessToken)
    result.activitiesSynced = activitiesResult.synced
    result.errors.push(...activitiesResult.errors)

    // Update last sync timestamp
    await db
      .update(schema.crmConnections)
      .set({
        lastSyncAt: new Date()
      })
      .where(eq(schema.crmConnections.id, connectionId))

    result.success = result.errors.length === 0

    return result
  } catch (error: any) {
    console.error('Salesforce sync error:', error)
    result.success = false
    result.errors.push(error.message)
    return result
  }
}

/**
 * Sync Salesforce Contacts as Clients
 */
async function syncSalesforceContacts(
  userId: string,
  instanceUrl: string,
  accessToken: string
): Promise<{ synced: number, errors: string[] }> {
  const errors: string[] = []
  let synced = 0

  try {
    // Query Salesforce Contacts
    const query = `SELECT Id, Name, Email, Phone, Title, AccountId, Account.Name FROM Contact WHERE Email != null LIMIT 100`
    const queryUrl = `${instanceUrl}/services/data/v58.0/query?q=${encodeURIComponent(query)}`

    const response = await fetch(queryUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch contacts: ${response.statusText}`)
    }

    const data = await response.json()
    const contacts: SalesforceContact[] = data.records || []

    // Import contacts as clients
    for (const contact of contacts) {
      try {
        // Check if client already exists
        const [existing] = await db
          .select()
          .from(schema.clients)
          .where(
            and(
              eq(schema.clients.userId, userId),
              eq(schema.clients.externalId, contact.Id)
            )
          )
          .limit(1)

        if (existing) {
          // Update existing client
          await db
            .update(schema.clients)
            .set({
              name: contact.Name,
              contactName: contact.Name,
              contactTitle: contact.Title || null,
              email: contact.Email,
              phone: contact.Phone || null,
              company: contact.Account?.Name || null
            })
            .where(eq(schema.clients.id, existing.id))
        } else {
          // Create new client
          await db.insert(schema.clients).values({
            userId,
            name: contact.Name,
            contactName: contact.Name,
            contactTitle: contact.Title || null,
            email: contact.Email,
            phone: contact.Phone || null,
            company: contact.Account?.Name || null,
            source: 'crm',
            externalId: contact.Id
          })
        }

        synced++
      } catch (error: any) {
        errors.push(`Contact ${contact.Name}: ${error.message}`)
      }
    }

    console.log(`Synced ${synced} contacts from Salesforce`)
  } catch (error: any) {
    errors.push(`Contacts sync failed: ${error.message}`)
  }

  return { synced, errors }
}

/**
 * Sync Salesforce Opportunities
 */
async function syncSalesforceOpportunities(
  userId: string,
  instanceUrl: string,
  accessToken: string
): Promise<{ synced: number, errors: string[] }> {
  const errors: string[] = []
  let synced = 0

  try {
    // Query Salesforce Opportunities
    const query = `SELECT Id, Name, Amount, StageName, Probability, CloseDate, ContactId FROM Opportunity LIMIT 100`
    const queryUrl = `${instanceUrl}/services/data/v58.0/query?q=${encodeURIComponent(query)}`

    const response = await fetch(queryUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch opportunities: ${response.statusText}`)
    }

    const data = await response.json()
    const opportunities: SalesforceOpportunity[] = data.records || []

    // Import opportunities
    for (const opp of opportunities) {
      try {
        // Find matching client by Salesforce Contact ID
        const [client] = await db
          .select()
          .from(schema.clients)
          .where(
            and(
              eq(schema.clients.userId, userId),
              eq(schema.clients.externalId, opp.ContactId || '')
            )
          )
          .limit(1)

        if (!client) {
          errors.push(`Opportunity ${opp.Name}: Client not found for Contact ID ${opp.ContactId}`)
          continue
        }

        // Map Salesforce stage to Routiine stage
        const stage = mapSalesforceStage(opp.StageName)

        // Check if opportunity already exists
        const [existing] = await db
          .select()
          .from(schema.opportunities)
          .where(
            and(
              eq(schema.opportunities.userId, userId),
              eq(schema.opportunities.externalId, opp.Id)
            )
          )
          .limit(1)

        if (existing) {
          // Update existing opportunity
          await db
            .update(schema.opportunities)
            .set({
              title: opp.Name,
              value: opp.Amount ? opp.Amount.toString() : null,
              stage,
              probability: opp.Probability || 0,
              closedAt: stage === 'closed_won' || stage === 'closed_lost' ? new Date(opp.CloseDate) : null
            })
            .where(eq(schema.opportunities.id, existing.id))
        } else {
          // Create new opportunity
          await db.insert(schema.opportunities).values({
            clientId: client.id,
            userId,
            title: opp.Name,
            value: opp.Amount ? opp.Amount.toString() : null,
            stage,
            probability: opp.Probability || 0,
            externalId: opp.Id,
            closedAt: stage === 'closed_won' || stage === 'closed_lost' ? new Date(opp.CloseDate) : null
          })
        }

        synced++
      } catch (error: any) {
        errors.push(`Opportunity ${opp.Name}: ${error.message}`)
      }
    }

    console.log(`Synced ${synced} opportunities from Salesforce`)
  } catch (error: any) {
    errors.push(`Opportunities sync failed: ${error.message}`)
  }

  return { synced, errors }
}

/**
 * Sync Salesforce Tasks as Activities
 */
async function syncSalesforceTasks(
  userId: string,
  instanceUrl: string,
  accessToken: string
): Promise<{ synced: number, errors: string[] }> {
  const errors: string[] = []
  let synced = 0

  try {
    // Query Salesforce Tasks
    const query = `SELECT Id, Subject, Description, Status, WhoId, ActivityDate FROM Task WHERE ActivityDate >= LAST_N_DAYS:30 LIMIT 100`
    const queryUrl = `${instanceUrl}/services/data/v58.0/query?q=${encodeURIComponent(query)}`

    const response = await fetch(queryUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`)
    }

    const data = await response.json()
    const tasks: SalesforceTask[] = data.records || []

    // Import tasks as activities
    for (const task of tasks) {
      try {
        // Find matching client by Salesforce Contact ID
        let client = null
        if (task.WhoId) {
          const [foundClient] = await db
            .select()
            .from(schema.clients)
            .where(
              and(
                eq(schema.clients.userId, userId),
                eq(schema.clients.externalId, task.WhoId)
              )
            )
            .limit(1)

          client = foundClient
        }

        // Check if activity already exists
        const [existing] = await db
          .select()
          .from(schema.activities)
          .where(
            and(
              eq(schema.activities.userId, userId),
              eq(schema.activities.externalId, task.Id)
            )
          )
          .limit(1)

        if (!existing) {
          // Create new activity
          await db.insert(schema.activities).values({
            userId,
            clientId: client?.id || null,
            activityType: 'note',
            description: task.Subject || 'Salesforce Task',
            outcome: task.Description || null,
            externalId: task.Id,
            timestamp: task.ActivityDate ? new Date(task.ActivityDate) : new Date()
          })

          // Create CRM activity signal
          await db.insert(schema.signals).values({
            userId,
            clientId: client?.id || null,
            type: 'positive',
            category: 'crm_activity',
            name: `CRM Activity: ${task.Subject}`,
            impact: 3,
            priority: 'medium',
            metadata: {
              source: 'salesforce',
              taskId: task.Id,
              status: task.Status
            }
          })

          synced++
        }
      } catch (error: any) {
        errors.push(`Task ${task.Subject}: ${error.message}`)
      }
    }

    console.log(`Synced ${synced} tasks from Salesforce`)
  } catch (error: any) {
    errors.push(`Tasks sync failed: ${error.message}`)
  }

  return { synced, errors }
}

/**
 * Map Salesforce opportunity stage to Routiine stage
 */
function mapSalesforceStage(
  sfStage: string
): 'discovery' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost' {
  const stage = sfStage.toLowerCase()

  if (stage.includes('closed') && stage.includes('won')) {
    return 'closed_won'
  }

  if (stage.includes('closed') || stage.includes('lost')) {
    return 'closed_lost'
  }

  if (stage.includes('negotiation') || stage.includes('contract')) {
    return 'negotiation'
  }

  if (stage.includes('proposal') || stage.includes('quote')) {
    return 'proposal'
  }

  // Default to discovery for any early stage
  return 'discovery'
}
