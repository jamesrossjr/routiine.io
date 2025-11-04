import { eq, and, gte } from 'drizzle-orm'
import { db, schema } from '~~/server/database'

interface DocumentViewMetadata {
  documentId?: string
  fileName?: string
  originalName?: string
  documentType?: string
  fileSize?: number
  viewCount?: number
  lastViewedAt?: string
  userAgent?: string
  ip?: string
  referrer?: string
}

/**
 * Document view tracking endpoint
 * Tracks document views and creates signals
 * GET /api/documents/view/:trackingId
 */
export default defineEventHandler(async (event) => {
  try {
    // Get tracking ID from route params
    const trackingId = getRouterParam(event, 'trackingId')

    if (!trackingId) {
      throw createError({
        statusCode: 400,
        message: 'Tracking ID is required'
      })
    }

    // Parse tracking ID: base64(userId:documentId:timestamp)
    let userId: string
    let documentId: string

    try {
      const decoded = Buffer.from(trackingId, 'base64').toString('utf-8')
      const parts = decoded.split(':')
      userId = parts[0]
      documentId = parts[1]
    } catch {
      throw createError({
        statusCode: 400,
        message: 'Invalid tracking ID'
      })
    }

    // Get document
    const [document] = await db
      .select()
      .from(schema.documents)
      .where(
        and(
          eq(schema.documents.id, documentId),
          eq(schema.documents.userId, userId),
          eq(schema.documents.trackingId, trackingId)
        )
      )
      .limit(1)

    if (!document) {
      throw createError({
        statusCode: 404,
        message: 'Document not found'
      })
    }

    // Get user agent and IP for tracking
    const userAgent = getRequestHeader(event, 'user-agent') || 'Unknown'
    const ip = getRequestIP(event, { xForwardedFor: true }) || 'Unknown'
    const referrer = getRequestHeader(event, 'referer') || 'Unknown'

    // Check for recent duplicate views (within 1 hour)
    const oneHourAgo = new Date(Date.now() - 3600000)

    const existingSignals = await db
      .select()
      .from(schema.signals)
      .where(
        and(
          eq(schema.signals.userId, userId),
          eq(schema.signals.category, 'document_view'),
          gte(schema.signals.timestamp, oneHourAgo)
        )
      )

    // Check if this specific document was viewed recently
    const recentView = existingSignals.find((signal) => {
      const metadata = signal.metadata as DocumentViewMetadata | null
      return (
        metadata?.documentId === documentId
        && new Date().getTime() - new Date(signal.timestamp).getTime() < 3600000
      )
    })

    if (recentView) {
      // Update existing signal with new view count
      const metadata = (recentView.metadata as DocumentViewMetadata | null) || {}
      const viewCount = (metadata.viewCount || 1) + 1

      await db
        .update(schema.signals)
        .set({
          metadata: {
            ...metadata,
            viewCount,
            lastViewedAt: new Date().toISOString(),
            userAgent,
            ip
          }
        })
        .where(eq(schema.signals.id, recentView.id))

      console.log(`Document re-viewed: ${document.originalName} (view #${viewCount})`)
    } else {
      // Create new document view signal
      // First view = high priority, subsequent views = medium priority
      const isFirstView = document.viewCount === 0
      const priority: 'high' | 'medium' | 'low' = isFirstView ? 'high' : 'medium'
      const impact = isFirstView ? 5 : 2

      await db.insert(schema.signals).values({
        userId,
        clientId: document.clientId,
        opportunityId: document.opportunityId,
        type: 'positive',
        category: 'document_view',
        name: `Document viewed: ${document.originalName}`,
        impact,
        priority,
        metadata: {
          documentId: document.id,
          fileName: document.fileName,
          originalName: document.originalName,
          documentType: document.documentType,
          fileSize: document.fileSize,
          viewCount: 1,
          userAgent,
          ip,
          referrer
        }
      })

      console.log(
        `Document viewed: ${document.originalName} (priority: ${priority}, impact: +${impact})`
      )
    }

    // Update document view count and last viewed timestamp
    await db
      .update(schema.documents)
      .set({
        viewCount: document.viewCount + 1,
        lastViewedAt: new Date()
      })
      .where(eq(schema.documents.id, documentId))

    // TODO: Trigger momentum score recalculation

    // Redirect to actual document
    return sendRedirect(event, document.filePath, 302)
  } catch (error: unknown) {
    console.error('Document view tracking error:', error)

    if (error.statusCode) {
      throw error
    }

    // Return generic error to not reveal tracking info
    throw createError({
      statusCode: 404,
      message: 'Document not found'
    })
  }
})
