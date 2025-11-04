import { eq, and, desc } from 'drizzle-orm'
import type { SQL } from 'drizzle-orm'
import { requireAuth } from '~~/server/utils/auth'
import { db, schema } from '~~/server/database'

/**
 * List user's documents
 * Returns all documents uploaded by the authenticated user
 * GET /api/documents
 */
export default defineEventHandler(async (event) => {
  try {
    // Require authentication
    const user = requireAuth(event)

    // Get query parameters
    const query = getQuery(event)
    const limit = parseInt(query.limit as string) || 20
    const offset = parseInt(query.offset as string) || 0
    const clientId = query.clientId as string | undefined

    // Build query
    let whereClause: SQL | undefined = eq(schema.documents.userId, user.userId)

    if (clientId) {
      whereClause = and(whereClause, eq(schema.documents.clientId, clientId))
    }

    // Get documents
    const documents = await db
      .select({
        id: schema.documents.id,
        fileName: schema.documents.fileName,
        originalName: schema.documents.originalName,
        documentType: schema.documents.documentType,
        mimeType: schema.documents.mimeType,
        fileSize: schema.documents.fileSize,
        trackingId: schema.documents.trackingId,
        viewCount: schema.documents.viewCount,
        lastViewedAt: schema.documents.lastViewedAt,
        clientId: schema.documents.clientId,
        opportunityId: schema.documents.opportunityId,
        createdAt: schema.documents.createdAt
      })
      .from(schema.documents)
      .where(whereClause)
      .orderBy(desc(schema.documents.createdAt))
      .limit(limit)
      .offset(offset)

    // Build trackable URLs for each document
    const documentsWithUrls = documents.map(doc => ({
      ...doc,
      trackableUrl: `${process.env.APP_URL}/api/documents/view/${doc.trackingId}`
    }))

    return {
      success: true,
      documents: documentsWithUrls,
      pagination: {
        limit,
        offset,
        total: documents.length
      }
    }
  } catch (error: unknown) {
    console.error('List documents error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred while fetching documents'
    })
  }
})
