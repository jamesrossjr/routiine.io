import { z } from 'zod'
import { db, schema } from '~~/server/database'
import { requireAuth } from '~~/server/utils/auth'

/**
 * Create a new signal
 * POST /api/signals
 */

const createSignalSchema = z.object({
  clientId: z.string().uuid().optional(),
  opportunityId: z.string().uuid().optional(),
  type: z.enum(['positive', 'negative']),
  category: z.enum([
    'email_open',
    'page_view',
    'form_submission',
    'video_watched',
    'cart_abandoned',
    'bounce',
    'session_timeout',
    'document_view',
    'crm_activity'
  ]),
  name: z.string().min(1).max(255),
  impact: z.number().int().min(-5).max(6),
  priority: z.enum(['high', 'medium', 'low']).default('medium'),
  metadata: z.record(z.any()).optional()
})

export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    const user = requireAuth(event)

    // Parse and validate request body
    const body = await readBody(event)
    const validationResult = createSignalSchema.safeParse(body)

    if (!validationResult.success) {
      throw createError({
        statusCode: 400,
        message: 'Validation failed',
        data: validationResult.error.errors
      })
    }

    const signalData = validationResult.data

    // Create signal in database
    const [signal] = await db
      .insert(schema.signals)
      .values({
        userId: user.userId,
        clientId: signalData.clientId || null,
        opportunityId: signalData.opportunityId || null,
        type: signalData.type,
        category: signalData.category,
        name: signalData.name,
        impact: signalData.impact,
        priority: signalData.priority,
        metadata: signalData.metadata || null
      })
      .returning()

    // TODO: Trigger momentum score recalculation
    // TODO: Send real-time notification via WebSocket

    console.log(`Signal created: ${signal.id} for user: ${user.userId}`)

    return {
      success: true,
      message: 'Signal created successfully',
      signal
    }
  } catch (error: unknown) {
    console.error('Create signal error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while creating signal'
    })
  }
})
