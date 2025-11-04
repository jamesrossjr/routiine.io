import { eq } from 'drizzle-orm'
import { db, schema } from '~~/server/database'

/**
 * Email Tracking Pixel
 * Tracks when an email is opened
 * GET /api/track/email/:trackingId
 */

// 1x1 transparent GIF pixel
const TRACKING_PIXEL = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64',
)

export default defineEventHandler(async (event) => {
  try {
    // Get tracking ID from route params
    const trackingId = getRouterParam(event, 'trackingId')

    if (!trackingId) {
      // Return tracking pixel anyway (don't reveal tracking failure)
      setResponseHeader(event, 'Content-Type', 'image/gif')
      setResponseHeader(event, 'Cache-Control', 'no-store, no-cache, must-revalidate, private')
      setResponseHeader(event, 'Pragma', 'no-cache')
      return TRACKING_PIXEL
    }

    // Parse tracking ID to extract userId, emailId, etc.
    // Format: base64(userId:emailId:timestamp)
    let userId: string
    let emailId: string

    try {
      const decoded = Buffer.from(trackingId, 'base64').toString('utf-8')
      const parts = decoded.split(':')
      userId = parts[0]
      emailId = parts[1]
    } catch (error) {
      // Invalid tracking ID, but still return pixel
      setResponseHeader(event, 'Content-Type', 'image/gif')
      setResponseHeader(event, 'Cache-Control', 'no-store, no-cache, must-revalidate, private')
      return TRACKING_PIXEL
    }

    // Get user agent and IP for metadata
    const userAgent = getRequestHeader(event, 'user-agent') || 'Unknown'
    const ip = getRequestIP(event, { xForwardedFor: true }) || 'Unknown'
    const referer = getRequestHeader(event, 'referer') || 'Direct'

    // Check if this is the first open or a repeat open
    const existingSignals = await db.query.signals.findMany({
      where: and(
        eq(schema.signals.userId, userId),
        eq(schema.signals.category, 'email_open'),
      ),
      orderBy: (signals, { desc }) => [desc(signals.timestamp)],
      limit: 10,
    })

    // Check if we already tracked this email recently (within 1 hour)
    const recentOpen = existingSignals.find((signal) => {
      const metadata = signal.metadata as any
      return (
        metadata?.emailId === emailId &&
        new Date().getTime() - new Date(signal.timestamp).getTime() < 3600000
      )
    })

    if (recentOpen) {
      // This is a duplicate open (e.g., email client pre-fetching)
      // Don't create another signal, but update open count
      const metadata = recentOpen.metadata as any
      const openCount = (metadata?.openCount || 1) + 1

      await db
        .update(schema.signals)
        .set({
          metadata: {
            ...metadata,
            openCount,
            lastOpenedAt: new Date().toISOString(),
            lastUserAgent: userAgent,
          },
        })
        .where(eq(schema.signals.id, recentOpen.id))

      console.log(`Email re-opened: ${emailId} (count: ${openCount})`)
    } else {
      // First open - create new signal
      const isFirstEverOpen = existingSignals.length === 0

      await db.insert(schema.signals).values({
        userId,
        type: 'positive',
        category: 'email_open',
        name: 'Email opened',
        impact: isFirstEverOpen ? 6 : 2, // Higher impact for first opens
        priority: isFirstEverOpen ? 'high' : 'medium',
        metadata: {
          emailId,
          userAgent,
          ip,
          referer,
          openCount: 1,
          firstOpen: isFirstEverOpen,
        },
      })

      console.log(`Email opened: ${emailId} (first: ${isFirstEverOpen})`)

      // TODO: Trigger momentum score recalculation
      // TODO: Send real-time notification
    }

    // Return tracking pixel
    setResponseHeader(event, 'Content-Type', 'image/gif')
    setResponseHeader(event, 'Cache-Control', 'no-store, no-cache, must-revalidate, private')
    setResponseHeader(event, 'Pragma', 'no-cache')
    setResponseHeader(event, 'Expires', '0')

    return TRACKING_PIXEL
  } catch (error) {
    console.error('Email tracking error:', error)

    // Always return tracking pixel even on error (don't break email rendering)
    setResponseHeader(event, 'Content-Type', 'image/gif')
    setResponseHeader(event, 'Cache-Control', 'no-store, no-cache, must-revalidate, private')
    return TRACKING_PIXEL
  }
})
