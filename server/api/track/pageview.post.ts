import { z } from 'zod'
import { db, schema } from '~~/server/database'

/**
 * Track page view
 * Creates a signal when a prospect visits a page
 * POST /api/track/pageview
 */

const pageViewSchema = z.object({
  url: z.string().url(),
  title: z.string().optional(),
  referrer: z.string().optional(),
  sessionId: z.string().optional(),
  userId: z.string().uuid().optional(), // Identified user
  clientId: z.string().uuid().optional(), // Associated client
})

export default defineEventHandler(async (event) => {
  try {
    // Parse and validate request body
    const body = await readBody(event)
    const validationResult = pageViewSchema.safeParse(body)

    if (!validationResult.success) {
      // Return 204 even on validation error (don't break tracking)
      setResponseStatus(event, 204)
      return
    }

    const pageViewData = validationResult.data

    // If no userId provided, we can't create a signal
    if (!pageViewData.userId) {
      // In a real app, you might store anonymous page views separately
      console.log('Anonymous page view:', pageViewData.url)
      setResponseStatus(event, 204)
      return
    }

    // Get user agent and IP
    const userAgent = getRequestHeader(event, 'user-agent') || 'Unknown'
    const ip = getRequestIP(event, { xForwardedFor: true }) || 'Unknown'

    // Determine signal priority based on page type
    let priority: 'high' | 'medium' | 'low' = 'low'
    let impact = 1

    if (pageViewData.url.includes('/pricing')) {
      priority = 'high'
      impact = 4
    } else if (
      pageViewData.url.includes('/features') ||
      pageViewData.url.includes('/product')
    ) {
      priority = 'medium'
      impact = 2
    }

    // Create page view signal
    await db.insert(schema.signals).values({
      userId: pageViewData.userId,
      clientId: pageViewData.clientId || null,
      type: 'positive',
      category: 'page_view',
      name: `Page viewed: ${pageViewData.title || pageViewData.url}`,
      impact,
      priority,
      metadata: {
        url: pageViewData.url,
        title: pageViewData.title,
        referrer: pageViewData.referrer,
        sessionId: pageViewData.sessionId,
        userAgent,
        ip,
      },
    })

    console.log(`Page view tracked: ${pageViewData.url} (priority: ${priority})`)

    // TODO: Trigger momentum score recalculation
    // TODO: Update session activity

    // Return 204 No Content (tracking endpoints don't need response body)
    setResponseStatus(event, 204)
  } catch (error) {
    console.error('Page view tracking error:', error)

    // Always return 204 even on error (don't break page rendering)
    setResponseStatus(event, 204)
  }
})
